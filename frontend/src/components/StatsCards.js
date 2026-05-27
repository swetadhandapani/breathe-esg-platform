import React from "react";

function StatsCards({ records }) {
  const totalRecords = records.length;

  const approved = records.filter(
    (item) => item.review_status === "approved"
  ).length;

  const suspicious = records.filter(
    (item) => item.review_status === "suspicious"
  ).length;

  const totalEmissions = records.reduce(
    (acc, item) => acc + item.emissions_kg_co2e,
    0
  );

  return (
    <div className="row g-3 mt-2">
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="custom-card p-3 h-100">
          <h6>Total Records</h6>

          <h3>{totalRecords}</h3>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3">
        <div className="custom-card p-3 h-100">
          <h6>Approved</h6>

          <h3>{approved}</h3>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3">
        <div className="custom-card p-3 h-100">
          <h6>Suspicious</h6>

          <h3>{suspicious}</h3>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3">
        <div className="custom-card p-3 h-100">
          <h6>Total CO2e</h6>

          <h3>{totalEmissions.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;