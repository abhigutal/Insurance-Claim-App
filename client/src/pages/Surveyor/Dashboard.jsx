import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../Layout/DashboardLayout";
import "./SurveyorDashboard.css";

const SurveyorDashboard = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/surveyor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInspections(res.data.inspections || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load inspections");
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = inspections.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = inspections.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <DashboardLayout>
      <div className="surveyor-dashboard">
        <div className="dashboard-header">
          <h1>Surveyor Dashboard</h1>
          <p>Manage assigned inspections and reports</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Inspections</h3>
            <h2>{inspections.length}</h2>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <h2>{pendingCount}</h2>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <h2>{completedCount}</h2>
          </div>
        </div>

        {loading && (
          <div className="loading">
            Loading inspections...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && inspections.length === 0 && (
          <div className="empty-state">
            No inspections assigned yet.
          </div>
        )}

        <div className="inspection-grid">
          {inspections.map((item) => (
            <div key={item.id} className="inspection-card">
              <div className="card-header">
                <h3>Claim #{item.claim_id}</h3>

                <span
                  className={`status ${
                    item.status?.toLowerCase() || ""
                  }`}
                >
                  {item.status || "Pending"}
                </span>
              </div>

              <div className="card-body">
                <p>
                  <strong>Report:</strong>
                  <br />
                  {item.report || "No report submitted"}
                </p>

                <p>
                  <strong>Damage Level:</strong>
                  {" "}
                  {item.damage_level}
                </p>

                <p>
                  <strong>Recommendation:</strong>
                  {" "}
                  {item.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SurveyorDashboard;