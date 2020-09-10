from rest_framework import serializers

from irekua_database.models import Item
from irekua_database.models import Licence
from irekua_database.models import LicenceType
from irekua_database.models import ItemType

from selia_annotator.api.serializers.users import UserSerializer
from selia_annotator.api.serializers.data_collection import CollectionSerializer
from selia_annotator.api.serializers.event_type import EventTypeSerializer


class LicenceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenceType
        fields = [
            'id',
            'name',
            'can_view',
            'can_download',
            'can_annotate',
            'years_valid_for'
        ]


class LicenceSerializer(serializers.ModelSerializer):
    licence_type = LicenceTypeSerializer(many=False, read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Licence
        fields = [
            'id',
            'is_active',
            'licence_type',
            'created_by',
            'created_on',
            'modified_by',
            'modified_on',
        ]



class ItemTypeSerializer(serializers.ModelSerializer):
    event_types = EventTypeSerializer(many=True, read_only=True)

    class Meta:
        model = ItemType
        fields = [
            'id',
            'name',
            'icon',
            'event_types'
        ]


class ItemSerializer(serializers.ModelSerializer):
    licence = LicenceSerializer(many=False, read_only=True)
    created_by = UserSerializer(read_only=True)
    modified_by = UserSerializer(read_only=True)
    item_type = ItemTypeSerializer(read_only=True)
    tags = serializers.SlugRelatedField(many=True, slug_field='value', read_only=True)
    collection = CollectionSerializer(
        many=False,
        read_only=True,
        source='sampling_event_device.sampling_event.collection')

    class Meta:
        model = Item
        fields = [
            'id',
            'item_type',
            'licence',
            'item_file',
            'media_info',
            'tags',
            'metadata',
            'captured_on',
            'ready_event_types',
            'collection',
            'created_by',
            'modified_by',
            'created_on',
            'modified_on',
        ]
