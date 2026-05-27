# SAP Research

Researched:
- SAP flat file exports
- SAP IDoc structure
- SAP OData documentation

Observed characteristics:
- inconsistent units
- plant codes
- mixed date formats
- localized column names

Prototype subset handled:
- fuel consumption rows
- quantity normalization
- plant code ingestion

Ignored:
- procurement hierarchies
- nested IDoc structures

---

# Utility Research

Researched:
- electricity portal CSV exports
- utility billing layouts

Observed:
- billing periods
- kWh/MWh variation
- tariff metadata

Prototype subset handled:
- electricity consumption rows
- billing period normalization

Ignored:
- tariff cost calculations
- demand charges

---

# Travel Research

Researched:
- SAP Concur reporting exports
- Navan API documentation

Observed:
- airport codes
- missing distances
- category-based emissions

Prototype subset handled:
- flights
- hotel stays
- taxi rides

Ignored:
- multi-leg itineraries
- carbon offset tracking

---

# Realistic Failure Modes

Production failures likely include:
- malformed CSVs
- duplicate uploads
- inconsistent date formats
- missing units
- incorrect airport codes
- extremely large files