import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import StatsCards from "../components/StatsCards";

import API from "../services/api";

import "../styles/dashboard.css";

function DashboardPage() {
  const [records, setRecords] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");

  const [scopeFilter, setScopeFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await API.get("records/");

      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let filteredRecords = [...records];

  if (statusFilter !== "all") {
    filteredRecords = filteredRecords.filter(
      (item) => item.review_status === statusFilter,
    );
  }

  if (scopeFilter !== "all") {
    filteredRecords = filteredRecords.filter(
      (item) => item.scope === scopeFilter,
    );
  }

  if (search.trim() !== "") {
    filteredRecords = filteredRecords.filter((item) =>
      item.activity_type.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sortType === "alphabetical") {
    filteredRecords.sort((a, b) =>
      a.activity_type.localeCompare(b.activity_type),
    );
  }

  if (sortType === "emissions") {
    filteredRecords.sort((a, b) => b.emissions_kg_co2e - a.emissions_kg_co2e);
  }

  if (sortType === "latest") {
    filteredRecords.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }

  return (
    <div>
      <Sidebar />

      <div
        className="main-content"
        style={{
          marginLeft: window.innerWidth >= 992 ? "250px" : "0px",
        }}
      >
        <h2 className="page-title">ESG Dashboard</h2>

        <p className="page-subtitle">
          Centralized ESG emissions monitoring dashboard
        </p>

        <StatsCards records={records} />

        <div className="custom-card filter-card mt-4">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-3">
              <label>Search Activity</label>

              <input
                type="text"
                className="form-control mt-2"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label>Status</label>

              <select
                className="form-select mt-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>

                <option value="pending">Pending</option>

                <option value="approved">Approved</option>

                <option value="rejected">Rejected</option>

                <option value="suspicious">Suspicious</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label>Scope</label>

              <select
                className="form-select mt-2"
                value={scopeFilter}
                onChange={(e) => setScopeFilter(e.target.value)}
              >
                <option value="all">All</option>

                <option value="scope1">Scope 1</option>

                <option value="scope2">Scope 2</option>

                <option value="scope3">Scope 3</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label>Sort By</label>

              <select
                className="form-select mt-2"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="latest">Latest Uploads</option>

                <option value="alphabetical">Alphabetical</option>

                <option value="emissions">Highest Emissions</option>
              </select>
            </div>
          </div>
        </div>

        <div className="custom-card table-card mt-4">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>

                <th>Activity</th>

                <th>Quantity</th>

                <th>Unit</th>

                <th>CO2e</th>

                <th>Status</th>

                <th>Scope</th>

                <th>Source</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>

                  <td>{record.activity_type}</td>

                  <td>{record.quantity}</td>

                  <td>{record.normalized_unit}</td>

                  <td>{record.emissions_kg_co2e}</td>

                  <td>
                    <span
                      className={`badge ${
                        record.review_status === "approved"
                          ? "bg-success"
                          : record.review_status === "rejected"
                            ? "bg-danger"
                            : record.review_status === "suspicious"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                      }`}
                    >
                      {record.review_status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        record.scope === "scope1"
                          ? "bg-primary"
                          : record.scope === "scope2"
                            ? "bg-info text-dark"
                            : "bg-dark"
                      }`}
                    >
                      {record.scope}
                    </span>
                  </td>

                  <td>
                    <span className="badge bg-secondary">
                      {record.source_type}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/review/${record.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
