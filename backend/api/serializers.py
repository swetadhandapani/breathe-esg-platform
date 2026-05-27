from rest_framework import serializers

from emissions.models import EmissionRecord


class EmissionRecordSerializer(
    serializers.ModelSerializer
):

    source_type = serializers.CharField(
            source='source.source_type'
        )

    class Meta:

        model = EmissionRecord

        fields = '__all__'