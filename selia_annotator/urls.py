from django.urls import path
from selia_annotator.views import CollectionItemAnnotatorView


urlpatterns = [
    path(
        '',
        CollectionItemAnnotatorView.as_view(),
        name='annotator_app'),
]
