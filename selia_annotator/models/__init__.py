import os

from selia_annotator.models.user_annotation import UserAnnotation
from selia_annotator.models.annotator import Annotator
from selia_annotator.models.annotator_version import AnnotatorVersion
from selia_annotator.models.annotator_module import AnnotatorModule


# Leave this function for migration backward compatibility
def annotator_path(instance, filename):
    _, ext = os.path.splitext(filename)
    return 'annotators/{name}_{version}.{ext}'.format(
        name=instance.annotation_tool.name.replace(' ', '_'),
        version=instance.annotation_tool.version.replace('.', '_'),
        ext=ext)


__all__ = [
    'AnnotatorVersion',
    'AnnotatorModule',
    'Annotator',
    'UserAnnotation',
    'annotator_path',
]
