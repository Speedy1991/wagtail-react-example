import graphene
from . import types
from wagtail.core.models import Page

# TODO filter queries with SITE


class Query(graphene.ObjectType):
    pages = graphene.List(types.PageInterface, specific=graphene.Boolean(default_value=False))
    page = graphene.Field(types.PageInterface, specific=graphene.Boolean(default_value=False), pk=graphene.ID())
    page_by_slug = graphene.Field(types.PageInterface, specific=graphene.Boolean(default_value=False), slug=graphene.String())
    page_by_url_path = graphene.Field(types.PageInterface, specific=graphene.Boolean(default_value=False), url_path=graphene.String())
    search = graphene.List(types.PageInterface, specific=graphene.Boolean(default_value=False))

    def resolve_page_by_url_path(self, info, specific, url_path, **kwargs):
        qs = Page.objects.live().public().filter(url_path=url_path)
        if specific:
            qs = qs.specific()
        return qs.first()

    def resolve_page_by_slug(self, info, specific, slug, **kwargs):
        qs = Page.objects.live().public().filter(slug=slug)
        if specific:
            qs = qs.specific()
        return qs.first()

    def resolve_pages(self, info, specific, **kwargs):
        qs = Page.objects.live().public().exclude(title="Root")
        if specific:
            qs = qs.specific()
        return qs.all()

    def resolve_page(self, info, pk, specific, **kwargs):
        qs = Page.objects.live().public().filter(pk=pk)
        if specific:
            qs = qs.specific()
        return qs.first()

    def resolve_search(self, info, query, specific, **kwargs):
        qs = Page.objects.live().public()
        if specific:
            qs = qs.specific()
        return qs.search(query)
