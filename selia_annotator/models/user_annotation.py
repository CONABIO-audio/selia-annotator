from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from irekua_database.utils import empty_JSON
from irekua_database.models import Annotation
from selia_visualizers.models import VisualizerVersion


class UserAnnotation(Annotation):
    LOW = 'L'
    MEDIUM = 'M'
    HIGH = 'H'
    QUALITY_OPTIONS = [
        (LOW, _('low')),
        (MEDIUM, _('medium')),
        (HIGH, _('high')),
    ]
    CERTAINTY_OPTIONS = [
        (LOW, _('uncertain')),
        (MEDIUM, _('somewhat certain')),
        (HIGH, _('certain')),
    ]

    annotator = models.ForeignKey(
        'AnnotatorVersion',
        on_delete=models.PROTECT,
        db_column='annotator_id',
        verbose_name=_('annotator'),
        help_text=_('Annotator used for annotating'),
        null=False,
        blank=False)
    visualizer = models.ForeignKey(
        VisualizerVersion,
        on_delete=models.PROTECT,
        db_column='visualizers_id',
        verbose_name=_('visualizer'),
        help_text=_('Visualizer used when annotating'),
        null=False,
        blank=False)
    visualizer_configuration = models.JSONField(
        db_column='visualizer_configuration',
        verbose_name=_('visualizer configuration'),
        default=empty_JSON,
        help_text=_('Configuration of visualizer at annotation creation'),
        blank=True,
        null=False)

    quality = models.CharField(
        db_column='quality',
        verbose_name=_('quality'),
        help_text=_('Quality of item content inside annotation'),
        blank=True,
        max_length=16,
        choices=QUALITY_OPTIONS)
    certainty = models.CharField(
        max_length=16,
        db_column='certainty',
        verbose_name=_('certainty'),
        help_text=_(
            'Level of certainty of location or labelling '
            'of annotation'),
        blank=True,
        choices=CERTAINTY_OPTIONS,
        null=True)
    commentaries = models.TextField(
        db_column='commentaries',
        verbose_name=_('commentaries'),
        help_text=_('Commentaries of annotator'),
        blank=True)

    class Meta:
        verbose_name = _('User Annotation')
        verbose_name_plural = _('User Annotations')

    def __str__(self):
        msg = _('User Annotation of item %(item_id)s')
        params = dict(item_id=self.item)
        return msg % params

    def clean(self):
        if self.annotation_type != self.annotator.annotator.annotation_type:
            msg = _('Invalid annotation tool for this annotation type')
            raise ValidationError({'annotation_tool': msg})

        try:
            self.visualizer.validate_configuration(self.visualizer_configuration)
        except ValidationError as error:
            raise ValidationError({'visualizer_configuration': error})

        super().clean()
