# Breathe ESG Platform

## Overview

Breathe ESG Platform is a prototype enterprise sustainability data ingestion and emissions review system.

The platform ingests ESG activity data from multiple enterprise sources such as SAP exports, utility consumption reports, and travel activity CSV files, normalizes the data into a consistent emissions model, and supports analyst review workflows before audit signoff.

The project demonstrates:

* ESG data ingestion pipelines
* Emissions normalization
* Scope categorization
* Review lifecycle workflows
* Auditability
* Multi-source enterprise integrations

---

# Features

## Authentication

* JWT-based authentication
* Secure API access
* Login/logout functionality

---

## ESG Data Upload

Supports CSV uploads from:

* SAP exports
* Utility portal exports
* Travel activity reports

---

## Emissions Processing

The system:

* normalizes inconsistent units
* calculates CO2e emissions
* categorizes Scope 1, Scope 2, and Scope 3 emissions

Examples:

* Gallons → Liters
* MWh → kWh

---

## Review Workflow

Analysts can:

* review uploaded records
* approve/reject records
* flag suspicious activity

Statuses:

* Pending
* Approved
* Rejected
* Suspicious

---

## Dashboard

Responsive ESG dashboard with:

* emissions records table
* filtering
* sorting
* search
* scope categorization
* source visibility
* review actions

---

## Auditability

The platform preserves:

* raw uploaded payloads
* upload source metadata
* timestamps
* review lifecycle tracking

---

# Tech Stack

## Frontend

* React
* Bootstrap
* Axios
* React Router

## Backend

* Django
* Django REST Framework
* JWT Authentication

## Database

* SQLite (prototype)

## Deployment

* Frontend → Vercel
* Backend → Render

---

# Project Architecture

## Backend Apps

### companies

Handles tenant organizations.

### ingestion

Handles uploaded source data and raw ingestion records.

### emissions

Handles normalized emissions records and calculations.

### audit

Handles immutable audit trail records.

### api

Exposes REST API endpoints.

---

# ESG Workflow

1. Upload enterprise CSV data
2. Store raw uploaded records
3. Normalize units and values
4. Calculate emissions
5. Categorize emissions scope
6. Detect suspicious records
7. Analyst review workflow
8. Audit traceability

---

# Scope Categorization

* Scope 1 → Fuel combustion
* Scope 2 → Electricity consumption
* Scope 3 → Travel and procurement

---

# Suspicious Data Detection

Examples:

* negative quantities
* future dates
* unknown units
* extreme values

---

# Installation

## Clone Repository

```bash
git clone https://github.com/swetadhandapani/breathe-esg-platform.git
```

---

# Backend Setup

```bash
cd backend

python -m venv env

env\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm start
```

# Future Improvements

Potential production upgrades:

* PostgreSQL
* Celery + Redis
* RBAC permissions
* Real emission factor APIs
* S3 file storage
* Async ingestion workers
* Analytics dashboards
* OCR/PDF parsing

---

# Why This Project

The project focuses on:

* explainable ESG ingestion
* audit readiness
* enterprise data normalization
* analyst review workflows
* scalable sustainability architecture

instead of over-optimizing for enterprise infrastructure complexity in an early prototype.


