from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from irekua_database.models import Annotation
from selia_annotator.api.serializers.annotation import AnnotationSerializer


class AnnotationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['item']
    pagination_class = None
