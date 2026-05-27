from django.urls import path

from .views import (
    upload_sap,
    upload_utility,
    upload_travel,
    get_records,
    review_record
)

urlpatterns = [

    path(
        'upload/sap/',
        upload_sap
    ),

    path(
        'upload/utility/',
        upload_utility
    ),

    path(
        'upload/travel/',
        upload_travel
    ),

    path(
        'records/',
        get_records
    ),

    path(
        'records/<int:pk>/review/',
        review_record
    ),
]