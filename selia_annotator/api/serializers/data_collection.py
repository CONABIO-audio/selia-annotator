from rest_framework import serializers

from irekua_database.models import CollectionType
from irekua_database.models import Collection
from selia_annotator.api.serializers.event_type import EventTypeSerializer


class CollectionTypeSerializer(serializers.ModelSerializer):
    event_types = EventTypeSerializer(many=True, read_only=True)

    class Meta:
        model = CollectionType
        fields = [
            'id',
            'name',
            'description',
            'restrict_annotation_types',
            'restrict_event_types',
            'annotation_types',
            'event_types',
        ]


class CollectionSerializer(serializers.ModelSerializer):
    collection_type = CollectionTypeSerializer(read_only=True)

    class Meta:
        model = Collection
        fields = [
            'id',
            'name',
            'collection_type',
        ]
