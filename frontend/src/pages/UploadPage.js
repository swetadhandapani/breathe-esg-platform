import React, { useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

function UploadPage() {
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState([]);

  const [uploadType, setUploadType] =
    useState("sap");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const requiredColumns = {
    sap: [
      "PlantCode",
      "Fuel Type",
      "Quantity",
      "Unit",
      "Posting Date",
    ],

    utility: [
      "MeterID",
      "Facility",
      "Consumption",
      "Unit",
      "BillingStart",
      "BillingEnd",
    ],

    travel: [
      "EmployeeID",
      "TravelType",
      "From",
      "To",
      "DistanceKM",
      "TravelDate",
    ],
  };

  const handleFileChange = (e) => {
    const selectedFile =
      e.target.files[0];

    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = (event) => {
      const text =
        event.target.result;

      const rows =
        text.split("\n");

      const previewRows = rows
        .slice(0, 5)
        .map((row) =>
          row.split(","),
        );

      setPreview(previewRows);
    };

    reader.readAsText(selectedFile);
  };

  const validateColumns = () => {
    if (!preview.length) {
      return false;
    }

    const uploadedHeaders =
      preview[0].map((h) =>
        h.trim(),
      );

    const required =
      requiredColumns[uploadType];

    for (let col of required) {
      if (
        !uploadedHeaders.includes(col)
      ) {
        setMessage(
          `Missing column: ${col}`,
        );

        return false;
      }
    }

    return true;
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage(
        "Please select a file",
      );

      return;
    }

    const isValid =
      validateColumns();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file,
      );

      let endpoint = "";

      if (uploadType === "sap") {
        endpoint =
          "upload/sap/";
      }

      if (
        uploadType === "utility"
      ) {
        endpoint =
          "upload/utility/";
      }

      if (
        uploadType === "travel"
      ) {
        endpoint =
          "upload/travel/";
      }

      const response =
        await API.post(
          endpoint,
          formData,
        );

      setMessage(
        response.data.message,
      );

      setPreview([]);

      setFile(null);
    } catch (error) {
      console.log(error);

      setMessage(
        "Upload failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft:
            window.innerWidth < 768
              ? "0"
              : "270px",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
          }}
        >
          Upload ESG Data
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Upload SAP, Utility,
          or Travel CSV files
        </p>

        {/* UPLOAD CARD */}

        <div
          className="card shadow-sm mt-4"
          style={{
            borderRadius: "14px",
            border: "none",
          }}
        >
          <div className="card-body p-4">
            {/* TEMPLATE DOWNLOADS */}

            <div className="mb-4">
              <h5>
                Download Templates
              </h5>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <a
                  href="/templates/sap_template.csv"
                  download
                  className="btn btn-outline-primary"
                >
                  SAP Template
                </a>

                <a
                  href="/templates/utility_template.csv"
                  download
                  className="btn btn-outline-success"
                >
                  Utility Template
                </a>

                <a
                  href="/templates/travel_template.csv"
                  download
                  className="btn btn-outline-dark"
                >
                  Travel Template
                </a>
              </div>
            </div>

            {/* SELECT TYPE */}

            <div className="mb-4">
              <label className="fw-bold">
                Select Upload Type
              </label>

              <select
                className="form-select mt-2"
                value={uploadType}
                onChange={(e) =>
                  setUploadType(
                    e.target.value,
                  )
                }
              >
                <option value="sap">
                  SAP Fuel Data
                </option>

                <option value="utility">
                  Utility Data
                </option>

                <option value="travel">
                  Travel Data
                </option>
              </select>
            </div>

            {/* FILE INPUT */}

            <div className="mb-4">
              <label className="fw-bold">
                Select CSV File
              </label>

              <input
                type="file"
                className="form-control mt-2"
                accept=".csv"
                onChange={
                  handleFileChange
                }
              />
            </div>

            {/* BUTTON */}

            <button
              className="btn btn-dark w-100"
              onClick={uploadFile}
              disabled={loading}
            >
              {loading
                ? "Uploading..."
                : "Upload File"}
            </button>

            {/* MESSAGE */}

            {message && (
              <div className="alert alert-info mt-4">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* CSV PREVIEW */}

        {preview.length > 0 && (
          <div
            className="card shadow-sm mt-4"
            style={{
              borderRadius: "14px",
              border: "none",
            }}
          >
            <div className="card-body p-4">
              <h5>CSV Preview</h5>

              <div className="table-responsive">
                <table className="table table-bordered table-hover mt-3">
                  <tbody>
                    {preview.map(
                      (
                        row,
                        index,
                      ) => (
                        <tr
                          key={index}
                        >
                          {row.map(
                            (
                              cell,
                              idx,
                            ) => (
                              <td
                                key={
                                  idx
                                }
                              >
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;