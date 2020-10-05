# Generated by Django 3.1.1 on 2020-10-05 02:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('selia_annotator', '0008_auto_20201004_2043'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='annotator',
            options={'ordering': ['name'], 'verbose_name': 'Annotator', 'verbose_name_plural': 'Annotators'},
        ),
        migrations.AlterModelOptions(
            name='annotatormodule',
            options={'verbose_name': 'Annotator Module', 'verbose_name_plural': 'Annotator Modules'},
        ),
        migrations.RenameField(
            model_name='annotatorversion',
            old_name='annotation_tool',
            new_name='annotator',
        ),
    ]
