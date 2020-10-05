# Generated by Django 3.1.1 on 2020-10-05 01:15
from functools import lru_cache

from django.db import migrations, models
import django.db.models.deletion


def ajust_annotation_annotator(apps, schema_editor):
    AnnotatorVersion = apps.get_model('selia_annotator', 'AnnotatorVersion')
    AnnotationTool = apps.get_model('selia_annotator', 'AnnotationTool')
    UserAnnotation = apps.get_model('selia_annotator', 'UserAnnotation')

    @lru_cache
    def get_annotator_version(name, version):
        return AnnotatorVersion.objects.get(
            annotation_tool__name=name,
            version=version)

    # Update annotation tool reference in annotations.
    for annotation in UserAnnotation.objects.all():
        annotator_version = get_annotator_version(
            annotation.annotation_tool.name,
            annotation.annotation_tool.version)
        annotation.annotator = annotator_version
        annotation.save()

    # Remove hanging annotation tools
    AnnotationTool.objects.filter(
        annotatorversion__isnull=True
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('selia_annotator', '0006_auto_20201004_1953'),
    ]

    operations = [
        migrations.AddField(
            model_name='userannotation',
            name='annotator',
            field=models.ForeignKey(db_column='annotator_id', default=1, help_text='Annotator used for annotating', on_delete=django.db.models.deletion.PROTECT, to='selia_annotator.annotatorversion', verbose_name='annotator'),
            preserve_default=False,
        ),
        migrations.RunPython(
            code=ajust_annotation_annotator,
            atomic=True,
        ),
    ]
