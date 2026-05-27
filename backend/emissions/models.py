from django.db import models

from companies.models import Company
from ingestion.models import DataSource


class EmissionRecord(models.Model):

    REVIEW_STATUS = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('suspicious', 'Suspicious')
    ]

    SCOPE_CHOICES = [
        ('scope1', 'Scope 1'),
        ('scope2', 'Scope 2'),
        ('scope3', 'Scope 3')
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    scope = models.CharField(
        max_length=50,
        choices=SCOPE_CHOICES
    )

    activity_type = models.CharField(
        max_length=255
    )

    quantity = models.FloatField()

    normalized_unit = models.CharField(
        max_length=100
    )

    emission_factor = models.FloatField()

    emissions_kg_co2e = models.FloatField()

    reporting_date = models.DateField()

    review_status = models.CharField(
        max_length=50,
        choices=REVIEW_STATUS,
        default='pending'
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.activity_type