from django.db import models

from companies.models import Company


class DataSource(models.Model):

    SOURCE_TYPES = [
        ('sap', 'SAP'),
        ('utility', 'Utility'),
        ('travel', 'Travel')
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=100,
        choices=SOURCE_TYPES
    )

    uploaded_by = models.CharField(
        max_length=255
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.source_type


class RawRecord(models.Model):

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    raw_payload = models.JSONField()

    processing_status = models.CharField(
        max_length=50
    )

    error_message = models.TextField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )