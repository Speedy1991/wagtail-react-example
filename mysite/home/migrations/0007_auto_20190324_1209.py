# Generated by Django 2.1.7 on 2019-03-24 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_auto_20190324_1144'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpage',
            old_name='body',
            new_name='blog_body',
        ),
        migrations.RenameField(
            model_name='categorypage',
            old_name='body',
            new_name='category_body',
        ),
    ]
