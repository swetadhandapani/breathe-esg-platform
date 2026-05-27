## Overview

The system is designed to ingest ESG activity data from multiple enterprise sources, normalize the data into a consistent emissions model, and support analyst review workflows before audit signoff.

The architecture prioritizes:
- Multi-tenancy
- Source traceability
- Auditability
- Unit normalization
- Scope categorization
- Review lifecycle management

---

# Core Entities

## Company

Represents a tenant organization.

Why:
Breathe ESG serves multiple enterprise clients. Every record must belong to a tenant for isolation and reporting purposes.

Fields:
- name
- industry
- created_at

---

## DataSource

Represents the origin of uploaded data.

Examples:
- SAP export
- Utility portal CSV
- Travel platform export

Why:
Emission records must preserve provenance:
- which system produced the data
- upload timestamp
- upload actor
- ingestion mechanism

Fields:
- company
- source_type
- uploaded_by
- uploaded_at

---

## RawRecord

Stores raw uploaded rows before normalization.

Why:
Real ESG ingestion pipelines fail frequently because enterprise data is inconsistent.

This model preserves:
- original payload
- processing failures
- transformation traceability

Fields:
- source
- raw_payload
- processing_status
- error_message

---

## EmissionRecord

Normalized emissions data.

This is the primary analyst-facing entity.

Supports:
- Scope 1
- Scope 2
- Scope 3

Why:
Analysts and auditors require normalized activity data independent of source format.

Fields:
- company
- source
- scope
- activity_type
- quantity
- normalized_unit
- emission_factor
- emissions_kg_co2e
- reporting_date
- review_status
- notes

---

## AuditLog

Immutable review trail.

Why:
Auditors require evidence of:
- who changed a record
- when
- what changed

Fields:
- record
- action
- changed_by
- timestamp

---

# Multi-Tenancy

Tenant isolation is handled using:
- ForeignKey relationships from all major entities to Company

Future production improvements:
- Row-level permissions
- Tenant-aware authentication
- Database partitioning

---

# Scope Categorization

The platform supports:
- Scope 1 → fuel combustion
- Scope 2 → electricity consumption
- Scope 3 → travel and procurement

This categorization is stored directly on EmissionRecord.

---

# Unit Normalization

Different enterprise systems emit inconsistent units:
- Liters
- Gallons
- kWh
- MWh
- m3

Normalization occurs during ingestion.

Example:
- Gallons → Liters
- MWh → kWh

---

# Auditability

The system preserves:
- raw uploaded payloads
- normalized outputs
- review actions
- timestamps

This allows:
- replaying ingestion
- explaining calculations
- auditor traceability

---

# Why This Model

The model prioritizes:
- explainability
- ingestion flexibility
- audit readiness
- extensibility

instead of over-optimizing for early complexity.