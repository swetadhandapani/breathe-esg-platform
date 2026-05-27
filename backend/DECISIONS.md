# 1. SAP Ingestion Choice

Decision:
Use CSV-based SAP flat file ingestion.

Why:
Real SAP integrations often require:
- middleware
- SAP credentials
- BAPI/OData integration access

For a 4-day prototype, CSV export ingestion was more realistic and demonstrable.

Handled:
- fuel activity rows
- inconsistent units
- plant codes
- date normalization

Ignored:
- live SAP APIs
- IDoc parsing
- procurement hierarchies

---

# 2. Utility Data Choice

Decision:
Use utility portal CSV exports instead of PDF parsing.

Why:
Most facilities teams export CSV reports from utility portals.

PDF OCR introduces:
- parsing complexity
- OCR failure risk
- formatting inconsistencies

CSV ingestion better demonstrates normalization logic.

---

# 3. Travel Data Choice

Decision:
Use CSV exports modeled after Concur/Navan reporting.

Why:
Corporate travel platforms typically expose:
- CSV exports
- REST APIs

CSV was chosen because:
- realistic enough for prototype
- easier to demonstrate ingestion pipeline

---

# 4. Authentication

Decision:
Use JWT authentication.

Why:
Stateless APIs align better with React frontend architecture.

---

# 5. Database Choice

Decision:
SQLite for prototype.

Why:
Fast setup and zero infrastructure overhead.

Production:
Would migrate to PostgreSQL.

---

# 6. Suspicious Data Detection

Decision:
Flag suspicious rows during ingestion.

Examples:
- negative quantities
- future dates
- extreme values
- unknown units

Why:
Analysts need prioritization of problematic records.

---

# 7. Review Workflow

Decision:
Records require analyst approval before audit signoff.

Why:
ESG data quality is inconsistent and requires human review.

---

# Questions For PM

If more time were available:
- Should procurement emissions be modeled separately?
- Should emission factors be externally versioned?
- Should analysts be able to edit quantities?
- What audit immutability guarantees are required?