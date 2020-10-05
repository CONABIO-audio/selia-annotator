# Generated by Django 3.1.1 on 2020-10-05 01:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('irekua_database', '0007_delete_visualizer'),
        ('selia_annotator', '0007_auto_20201004_2015'),
    ]

    operations = [
        migrations.RenameModel('AnnotationTool', 'Annotator'),
        migrations.AlterModelOptions(
            name='annotator',
            options={'ordering': ['name'], 'verbose_name': 'Annotator', 'verbose_name_plural': 'Annotator'},
        ),
        migrations.RemoveField(
            model_name='annotator',
            name='version',
        ),
        migrations.RemoveField(
            model_name='userannotation',
            name='annotation_tool',
        ),
    ]
