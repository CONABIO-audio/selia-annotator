from django.contrib import admin


class UserAnnotationAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_on'

    search_fields = [
        'event_type__name',
        'annotation_type__name',
        'item__item_type__name',
        'created_by__username',
    ]

    list_display = (
        'id',
        'item',
        'event_type',
        'annotation_type',
        'visualizer',
        'annotator',
        'created_by',
    )

    autocomplete_fields = [
        'labels',
        'item',
        'event_type',
        'annotation_type',
        'visualizer',
        'annotator',
    ]

    list_filter = (
        'item__item_type',
        'event_type',
        'annotation_type',
        'created_by',
        'created_on',
    )

    readonly_fields = (
        'created_on',
        'created_by',
        'modified_on',
        'modified_by',
    )

    fieldsets = (
        (None, {
            'fields': (
                ('item', 'event_type', 'annotation_type'),
                ('annotation', 'labels'),
            ),
        }),
        ('User Comments', {
            'fields': (
                ('quality', 'certainty'),
                ('commentaries', )
            ),
        }),
        ('Annotation Tools', {
            'fields': (
                ('annotator', 'visualizer'),
                ('visualizer_configuration',)
            ),
        }),
        ('Creation', {
            'classes': ('wide', 'extrapretty'),
            'fields': (
                ('created_by', 'created_on',),
                ('modified_by', 'modified_on',),
            ),
        })
    )

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.modified_by = request.user
        super().save_model(request, obj, form, change)
