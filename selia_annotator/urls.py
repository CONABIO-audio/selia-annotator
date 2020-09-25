from django.urls import path, include
from selia_annotator import views
# TODO: Update API when AnnotationTool migration is done.
# from selia_annotator.api.router import router


urlpatterns = [
    path(
        '',
        views.CollectionItemAnnotatorView.as_view(),
        name='annotator_app'),
    path('annotators/', views.get_annotator, name='get_annotator'),
    # path('api/', include(router.urls)),
]
