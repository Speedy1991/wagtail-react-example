import graphene
from . import types
from wagtail.core.models import Page
from django.http.response import Http404


def _get_page(request, path, specific=False):
    if not request.site:
        return None

    try:
        path_components = [component for component in path.split('/') if component]
        page, args, kwargs = request.site.root_page.route(request, path_components)
        if specific:
            page = page.specific
        return page
    except Http404:
        return None


class Query(graphene.ObjectType):
    pages = graphene.List(types.PageInterface, specific=graphene.Boolean(default_value=False))
    page_by_id = graphene.Field(types.PageInterface, specific=graphene.Boolean(default_value=False), pk=graphene.ID())
    page_by_path = graphene.Field(types.PageInterface, specific=graphene.Boolean(default_value=False), path=graphene.String())
    search = graphene.List(types.PageInterface, specific=graphene.Boolean(default_value=False), query=graphene.String())
    menu = graphene.List(types.PageInterface)

    def resolve_page_by_path(self, info, specific, path, **kwargs):
        return _get_page(info.context, path, specific)

    def resolve_page_by_id(self, info, pk, specific, **kwargs):
        qs = Page.objects.live().public().filter(pk=pk)
        if specific:
            qs = qs.specific()
        return qs.first()

    def resolve_search(self, info, query, specific, **kwargs):
        return info.context.site.root_page.get_descendants(inclusive=True).search(query)

    def resolve_menu(self, info, **kwargs):
        return Page.objects.live().public().filter(show_in_menus=True)
