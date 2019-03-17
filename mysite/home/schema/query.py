import graphene
from contrib.graphql.schema.types import PageInterface
from wagtail.core.models import Page


class Query(graphene.ObjectType):
    root = graphene.Field(PageInterface)

    def resolve_root(self, info, **kwargs):
        return Page.objects.specific().filter(title="Home").first()
