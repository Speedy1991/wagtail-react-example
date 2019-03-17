import graphene
from contrib.graphql.schema.query import Query as WagtailQuery
from home.schema.query import Query as HomeQuery
from contrib.graphql.schema.types import export_types
from home.schema.types import export_types as home_export_types


class Query(WagtailQuery, HomeQuery):
    pass


schema = graphene.Schema(query=Query, types=[*export_types, *home_export_types])
