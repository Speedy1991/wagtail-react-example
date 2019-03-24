import graphene

from graphene_django import DjangoObjectType

from wagtail.core.fields import StreamField
from graphene.types import Scalar
from graphene.types.generic import GenericScalar
from wagtail.images.models import Image
from wagtail.core.models import Page
from string import capwords
from graphene_django.converter import convert_django_field


class DefaultStreamBlock(graphene.ObjectType):
    block_type = graphene.String()
    value = GenericScalar()


class GenericStreamFieldType(Scalar):
    @staticmethod
    def serialize(stream_value):
        return stream_value.stream_data


@convert_django_field.register(StreamField)
def convert_stream_field(field, registry=None):
    return GenericStreamFieldType(
        description=field.help_text, required=not field.null
    )


class WagtailImageRenditionType(graphene.ObjectType):
    id = graphene.ID()
    url = graphene.String()
    width = graphene.Int()
    height = graphene.Int()


def create_stream_field_type(field_name, **kwargs):
    block_type_handlers = kwargs.copy()

    class Meta:
        types = (DefaultStreamBlock,) + tuple(block_type_handlers.values())

    StreamFieldType = type(
        f"{capwords(field_name, sep='_').replace('_', '')}Type", (graphene.Union,), dict(Meta=Meta))

    def convert_block(block):
        block_type = block.get('type')
        value = block.get('value')
        if block_type in block_type_handlers:
            handler = block_type_handlers.get(block_type)
            if isinstance(value, dict):
                return handler(value=value, block_type=block_type, **value)
            else:
                return handler(value=value, block_type=block_type)
        else:
            return DefaultStreamBlock(value=value, block_type=block_type)

    def resolve_field(self, info):
        field = getattr(self, field_name)
        return [convert_block(block) for block in field.stream_data]

    return graphene.List(StreamFieldType), resolve_field


class ImageType(DjangoObjectType):
    class Meta:
        model = Image
        exclude_fields = ['tags']

    rendition = graphene.Field(
        WagtailImageRenditionType,
        max=graphene.String(),
        min=graphene.String(),
        width=graphene.Int(),
        height=graphene.Int(),
        fill=graphene.String(),
        format=graphene.String(),
        bgcolor=graphene.String(),
        jpegquality=graphene.Int()
    )

    def resolve_rendition(self, info, **kwargs):
        filters = "|".join([f"{key}-{val}" for key, val in kwargs.items()])
        img = self.get_rendition(filters)
        return WagtailImageRenditionType(id=img.id, url=img.url, width=img.width, height=img.height)


_inclusive_page_list = graphene.List(
    lambda: PageInterface,
    inclusive=graphene.Boolean(default_value=False),
    specific=graphene.Boolean(default_value=False)
)


class PageInterface(graphene.Interface):
    id = graphene.ID()
    title = graphene.String()
    slug = graphene.String()
    seo_title = graphene.String()
    search_description = graphene.String()
    url_path = graphene.String()
    children = graphene.List(
        lambda: PageInterface,
        specific=graphene.Boolean(default_value=False)
    )
    descendants = _inclusive_page_list
    ancestors = _inclusive_page_list
    siblings = _inclusive_page_list
    parent = graphene.Field(lambda: PageInterface, specific=graphene.Boolean(default_value=False))

    def resolve_children(self, info, specific, **kwargs):
        qs = self.get_children().live().public()
        if specific:
            qs = qs.specific()
        return qs

    def resolve_descendants(self, info, inclusive, specific, **kwargs):
        qs = self.get_descendants(inclusive=inclusive).live().public()
        if specific:
            qs = qs.specific()
        return qs

    def resolve_ancestors(self, info, inclusive, specific, **kwargs):
        qs = self.get_ancestors(inclusive=inclusive).live().public()
        if specific:
            qs = qs.specific()
        return qs

    def resolve_parent(self, info, specific, **kwargs):
        page = self.get_parent()
        if specific:
            page = page.specific
        return page

    def resolve_siblings(self, info, specific, inclusive, **kwargs):
        qs = self.get_siblings(inclusive=inclusive).live().public()
        if specific:
            qs = qs.specific()
        return qs


class PageType(DjangoObjectType):
    class Meta:
        model = Page
        interfaces = [PageInterface, ]


export_types = [ImageType, PageType]
