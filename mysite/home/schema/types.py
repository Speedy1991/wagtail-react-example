import graphene
from graphene_django import DjangoObjectType
from .. import models

from django.contrib.auth import get_user_model
from contrib.graphql.schema.types import DefaultStreamBlock, create_stream_field_type, ImageType, PageInterface


UserModel = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        only_fields = ["id", "last_name", "first_name", "email", "username"]


class H2BlockType(DefaultStreamBlock):
    title = graphene.String()


class H2PBlockType(DefaultStreamBlock):
    title = graphene.String()
    text = graphene.String()


class BlogPageType(DjangoObjectType):
    (blog_body, resolve_blog_body) = create_stream_field_type(
        'blog_body',
        h2=H2BlockType,
        h2p=H2PBlockType
    )

    image = graphene.Field(ImageType)

    class Meta:
        model = models.BlogPage
        interfaces = [PageInterface, ]


class HomePageType(DjangoObjectType):
    class Meta:
        model = models.HomePage
        interfaces = [PageInterface, ]


class CategoryPageType(DjangoObjectType):
    (category_body, resolve_category_body) = create_stream_field_type(
        'category_body',
        h2=H2BlockType,
        h2p=H2PBlockType
    )

    image = graphene.Field(ImageType)

    class Meta:
        model = models.CategoryPage
        interfaces = [PageInterface, ]


class SearchResults(graphene.Union):
    class Meta:
        types = [CategoryPageType, BlogPageType]


export_types = [BlogPageType, CategoryPageType, HomePageType, H2PBlockType, H2BlockType]
