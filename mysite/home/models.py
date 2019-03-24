from django.db import models
from wagtail.core.fields import StreamField
from wagtail.core import blocks
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.models import Page


class HomePage(Page):
    body = StreamField([
        ("h2", blocks.StructBlock([
            ("title", blocks.CharBlock()),
        ])),
        ("h2p", blocks.StructBlock([
            ("title", blocks.CharBlock()),
            ("text", blocks.CharBlock())
        ]))
    ])

    content_panels = [
        FieldPanel("title"),
        StreamFieldPanel("body"),
    ]

    parent_page_types = [Page]


class CategoryPage(Page):
    category_body = StreamField([
        ("h2", blocks.StructBlock([
            ("title", blocks.CharBlock()),
        ])),
        ("h2p", blocks.StructBlock([
            ("title", blocks.CharBlock()),
            ("text", blocks.CharBlock())
        ]))
    ])
    image = models.ForeignKey('wagtailimages.Image', on_delete=models.SET_NULL, null=True, related_name='+')

    content_panels = [
        FieldPanel("title"),
        StreamFieldPanel("category_body"),
        ImageChooserPanel("image")
    ]

    parent_page_types = [HomePage]


class BlogPage(Page):
    blog_body = StreamField([
        ("h2", blocks.StructBlock([
            ("title", blocks.CharBlock()),
        ])),
        ("h2p", blocks.StructBlock([
            ("title", blocks.CharBlock()),
            ("text", blocks.CharBlock())
        ]))
    ])
    image = models.ForeignKey('wagtailimages.Image', on_delete=models.SET_NULL, null=True, related_name='+')

    content_panels = [
        FieldPanel("title"),
        StreamFieldPanel("blog_body"),
        ImageChooserPanel("image")
    ]

    parent_page_types = [HomePage, CategoryPage]
