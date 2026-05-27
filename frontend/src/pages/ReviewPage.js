import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

import "../styles/dashboard.css";

function ReviewPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [reviewStatus, setReviewStatus] = useState("approved");

  const [notes, setNotes] = useState("");

  const submitReview = async () => {
    try {
      await API.patch(`records/${id}/review/`, {
        review_status: reviewStatus,
        notes,
      });

      alert("Review updated");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Failed to update");
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="main-content">
        <h2 className="page-title">Review Record</h2>

        <div className="custom-card p-4 mt-4">
          <label>Status</label>

          <select
            className="form-select mt-2"
            value={reviewStatus}
            onChange={(e) => setReviewStatus(e.target.value)}
          >
            <option value="pending">Pending</option>

            <option value="approved">Approved</option>

            <option value="rejected">Rejected</option>

            <option value="suspicious">Suspicious</option>
          </select>

          <label className="mt-4">Notes</label>

          <textarea
            rows="5"
            className="form-control mt-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            className="btn btn-success mt-4"
            onClick={submitReview}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;