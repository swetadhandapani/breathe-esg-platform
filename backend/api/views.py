import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from companies.models import Company
from ingestion.models import DataSource, RawRecord
from emissions.models import EmissionRecord
from audit.models import AuditLog

from .serializers import EmissionRecordSerializer

from ingestion.utils import normalize_unit
from ingestion.utils import calculate_emissions


# ----------------------------------------
# SAP INGESTION
# ----------------------------------------

@api_view(['POST'])
def upload_sap(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    company, _ = Company.objects.get_or_create(
        name='Demo Company',
        industry='Manufacturing'
    )

    source = DataSource.objects.create(
        company=company,
        source_type='sap',
        uploaded_by='admin'
    )

    created_records = []

    for _, row in df.iterrows():

        try:

            quantity = float(row['Quantity'])

            normalized_unit = normalize_unit(
                row['Unit']
            )

            factor, emissions = calculate_emissions(
                row['Fuel Type'],
                quantity
            )

            status_flag = 'pending'

            # ---------------------------
            # Suspicious Data Detection
            # ---------------------------

            if quantity < 0:
                status_flag = 'suspicious'

            if quantity > 100000:
                status_flag = 'suspicious'

            if normalized_unit not in [
                'Liters',
                'kWh',
                'km',
                'm3'
            ]:
                status_flag = 'suspicious'

            RawRecord.objects.create(
                source=source,
                raw_payload=row.to_dict(),
                processing_status='processed'
            )

            record = EmissionRecord.objects.create(
                company=company,
                source=source,
                scope='scope1',
                activity_type=row['Fuel Type'],
                quantity=quantity,
                normalized_unit=normalized_unit,
                emission_factor=factor,
                emissions_kg_co2e=emissions,
                reporting_date=row['Posting Date'],
                review_status=status_flag
            )

            AuditLog.objects.create(
                record=record,
                action='Created SAP emission record',
                changed_by='system'
            )

            created_records.append(record.id)

        except Exception as e:

            RawRecord.objects.create(
                source=source,
                raw_payload=row.to_dict(),
                processing_status='failed',
                error_message=str(e)
            )

    return Response({
        'message': 'SAP upload successful',
        'records_created': len(created_records)
    })


# ----------------------------------------
# UTILITY INGESTION
# ----------------------------------------

@api_view(['POST'])
def upload_utility(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    company, _ = Company.objects.get_or_create(
        name='Demo Company',
        industry='Manufacturing'
    )

    source = DataSource.objects.create(
        company=company,
        source_type='utility',
        uploaded_by='admin'
    )

    created_records = []

    for _, row in df.iterrows():

        try:

            quantity = float(row['Consumption'])

            unit = row['Unit']

            normalized_unit = 'kWh'

            # MWh → kWh conversion
            if unit == 'MWh':
                quantity = quantity * 1000

            emissions = quantity * 0.4

            status_flag = 'pending'

            if quantity < 0:
                status_flag = 'suspicious'

            if quantity > 500000:
                status_flag = 'suspicious'

            record = EmissionRecord.objects.create(
                company=company,
                source=source,
                scope='scope2',
                activity_type='Electricity',
                quantity=quantity,
                normalized_unit=normalized_unit,
                emission_factor=0.4,
                emissions_kg_co2e=emissions,
                reporting_date=row['BillingStart'],
                review_status=status_flag
            )

            AuditLog.objects.create(
                record=record,
                action='Created utility emission record',
                changed_by='system'
            )

            created_records.append(record.id)

        except Exception as e:

            RawRecord.objects.create(
                source=source,
                raw_payload=row.to_dict(),
                processing_status='failed',
                error_message=str(e)
            )

    return Response({
        'message': 'Utility upload successful',
        'records_created': len(created_records)
    })


# ----------------------------------------
# TRAVEL INGESTION
# ----------------------------------------

@api_view(['POST'])
def upload_travel(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    company, _ = Company.objects.get_or_create(
        name='Demo Company',
        industry='Manufacturing'
    )

    source = DataSource.objects.create(
        company=company,
        source_type='travel',
        uploaded_by='admin'
    )

    factors = {
        'Flight': 0.15,
        'Taxi': 0.21,
        'Hotel': 12
    }

    created_records = []

    for _, row in df.iterrows():

        try:

            distance = float(row['DistanceKM'])

            travel_type = row['TravelType']

            factor = factors.get(travel_type, 0)

            emissions = distance * factor

            status_flag = 'pending'

            # Suspicious detection

            if distance < 0:
                status_flag = 'suspicious'

            if distance > 20000:
                status_flag = 'suspicious'

            record = EmissionRecord.objects.create(
                company=company,
                source=source,
                scope='scope3',
                activity_type=travel_type,
                quantity=distance,
                normalized_unit='km',
                emission_factor=factor,
                emissions_kg_co2e=emissions,
                reporting_date=row['TravelDate'],
                review_status=status_flag
            )

            AuditLog.objects.create(
                record=record,
                action='Created travel emission record',
                changed_by='system'
            )

            created_records.append(record.id)

        except Exception as e:

            RawRecord.objects.create(
                source=source,
                raw_payload=row.to_dict(),
                processing_status='failed',
                error_message=str(e)
            )

    return Response({
        'message': 'Travel upload successful',
        'records_created': len(created_records)
    })


# ----------------------------------------
# FETCH RECORDS
# ----------------------------------------

@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().order_by(
        '-created_at'
    )

    serializer = EmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)


# ----------------------------------------
# REVIEW RECORD
# ----------------------------------------

@api_view(['PATCH'])
def review_record(request, pk):

    try:

        record = EmissionRecord.objects.get(id=pk)

    except EmissionRecord.DoesNotExist:

        return Response(
            {'error': 'Record not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    review_status = request.data.get(
        'review_status'
    )

    notes = request.data.get('notes')

    record.review_status = review_status

    record.notes = notes

    record.save()

    AuditLog.objects.create(
        record=record,
        action=f'Review status changed to {review_status}',
        changed_by='analyst'
    )

    return Response({
        'message': 'Record updated'
    })