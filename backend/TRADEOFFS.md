# 1. No PDF OCR Parsing

Did not build:
- utility bill OCR extraction

Why:
OCR pipelines are error-prone and would consume most prototype time.

Alternative chosen:
CSV utility exports.

---

# 2. No Live SAP Integration

Did not build:
- SAP BAPI/OData integration

Why:
Would require:
- SAP access
- credentials
- enterprise middleware

CSV exports better fit prototype constraints.

---

# 3. No Async Processing Queue

Did not build:
- Celery/RQ ingestion workers

Why:
Prototype ingestion volumes are small.

Production:
Would process uploads asynchronously.

---

# 4. No Emission Factor Service

Did not build:
- external emissions factor API integration

Why:
Hardcoded factors simplified the prototype.

Production:
Would use:
- EPA factors
- DEFRA datasets
- versioned factors

---

# 5. No Role-Based Permissions

Did not build:
- analyst/admin permission separation

Why:
Focus prioritized ingestion and normalization.

Production:
Would implement:
- RBAC
- tenant-scoped permissions
- audit controls