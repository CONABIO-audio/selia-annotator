from django.contrib import admin

from selia_annotator import models
from selia_annotator.admin.user_annotations import UserAnnotationAdmin
from selia_annotator.admin.annotators import AnnotatorAdmin
from selia_annotator.admin.annotator_versions import AnnotatorVersionAdmin
from selia_annotator.admin.annotator_modules import AnnotatorModuleAdmin


admin.site.register(
    models.UserAnnotation,
    UserAnnotationAdmin)
admin.site.register(
    models.Annotator,
    AnnotatorAdmin)
admin.site.register(
    models.AnnotatorVersion,
    AnnotatorVersionAdmin)
admin.site.register(
    models.AnnotatorModule,
    AnnotatorModuleAdmin)
