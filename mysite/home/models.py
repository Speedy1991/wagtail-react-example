from django.db import models
from wagtail.core.fields import StreamField
from wagtail.core import blocks
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.models import Page


class HomePage(Page):
    pass


class BlogPage(Page):
    body = StreamField([
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
        StreamFieldPanel("body"),
        ImageChooserPanel("image")
    ]


class NewBlogPage(Page):
    color1 = models.CharField(max_length=7, null=True, blank=True)
    color2 = models.CharField(max_length=7, null=True, blank=True)
    color3 = models.CharField(max_length=7, null=True, blank=True)

    content_panels = [
        FieldPanel("title"),
        FieldPanel("color1"),
        FieldPanel("color2"),
        FieldPanel("color3"),
    ]
