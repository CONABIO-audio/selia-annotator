# Generated by Django 3.1.1 on 2020-09-26 00:35

from django.db import migrations, models
import django.db.models.deletion


def move_references_to_visualizer_versions(apps, schema_editor):
    UserAnnotation = apps.get_model('selia_annotator', 'UserAnnotation')
    VisualizerVersion = apps.get_model('selia_visualizers', 'VisualizerVersion')

    for annotation in UserAnnotation.objects.all():
        visualizer = annotation.visualizer

        try:
            visualizer_version = VisualizerVersion.objects.get(
                visualizer__name=visualizer.name,
                version=visualizer.version)
            annotation.visualizer_tmp = visualizer_version
            annotation.save()

            assert annotation.visualizer.name == annotation.visualizer_tmp.visualizer.name
            assert annotation.visualizer.version == annotation.visualizer_tmp.version

        except VisualizerVersion.DoesNotExist:
            pass


class Migration(migrations.Migration):

    dependencies = [
        ('selia_visualizers', '0003_auto_20200925_1920'),
        ('selia_annotator', '0004_auto_20200925_1651'),
    ]

    operations = [
        migrations.AddField(
            model_name='userannotation',
            name='visualizer_tmp',
            field=models.ForeignKey(db_column='visualizers_tmp_id', help_text='Visualizer used when annotating', on_delete=django.db.models.deletion.PROTECT, to='selia_visualizers.visualizerversion', verbose_name='visualizer', null=True),
        ),
        migrations.RunPython(
            move_references_to_visualizer_versions,
        ),
        migrations.RemoveField(
            model_name='userannotation',
            name='visualizer',
        ),
        migrations.AlterField(
            model_name='userannotation',
            name='visualizer_tmp',
            field=models.ForeignKey(db_column='visualizers_id', help_text='Visualizer used when annotating', on_delete=django.db.models.deletion.PROTECT, to='selia_visualizers.visualizerversion', verbose_name='visualizer'),
        ),
        migrations.RenameField(
            model_name='userannotation',
            old_name='visualizer_tmp',
            new_name='visualizer',
        )
    ]
