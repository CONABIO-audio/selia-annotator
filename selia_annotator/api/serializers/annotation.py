from rest_framework import serializers

from irekua_database.models import Annotation
from irekua_database.models import AnnotationType
from irekua_database.models import AnnotationTool
from irekua_database.models import Visualizer
from selia_annotator.api.serializers.users import UserSerializer
from selia_annotator.api.serializers.terms import TermSerializer





class VisualizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visualizer
        fields = [
            'id',
            'name',
            'version',
        ]


class AnnotationToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnotationTool
        fields = [
            'id',
            'name',
            'version',
        ]


class AnnotationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnotationType
        fields = [
            'id',
            'name',
            'description',
            'icon',
            'annotation_schema',
        ]


class AnnotationSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    modified_by = UserSerializer(read_only=True)
    labels = TermSerializer(many=True, read_only=True)
    visualizer = VisualizerSerializer(read_only=True)
    annotation_tool = AnnotationToolSerializer(read_only=True)

    class Meta:
        model = Annotation
        fields = [
            'id',
            'item',
            'annotation_type',
            'event_type',
            'annotation',
            'labels',
            'annotation_tool',
            'visualizer',
            'visualizer_configuration',
            'certainty',
            'quality',
            'commentaries',
            'created_by',
            'created_on',
            'modified_by',
            'modified_on',
        ]
