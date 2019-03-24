# Generated by Django 2.1.7 on 2019-03-24 10:41

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailforms', '0003_capitalizeverbose'),
        ('wagtailcore', '0041_group_collection_permissions_verbose_name_plural'),
        ('wagtailimages', '0001_squashed_0021'),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        ('home', '0004_auto_20190315_0913'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('body', wagtail.core.fields.StreamField([('h2', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock())])), ('h2p', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.CharBlock())]))])),
                ('image', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.RemoveField(
            model_name='newblogpage',
            name='page_ptr',
        ),
        migrations.AddField(
            model_name='homepage',
            name='body',
            field=wagtail.core.fields.StreamField([('h2', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock())])), ('h2p', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.CharBlock())]))], default=None),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='NewBlogPage',
        ),
    ]
