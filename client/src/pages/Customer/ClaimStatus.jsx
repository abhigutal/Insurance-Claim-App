import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import "./ClaimStatus.css";

const sampleClaims = [
  {
    id: "CLM-2026-1001",
    title: "Health Insurance",
    status: "Approved",
    progress: 100,
    officer: "Rahul Sharma",
    surveyor: "Not Required",
    updated: "19 Jul 2026"
  },
  {
    id: "CLM-2026-1002",
    title: "Vehicle Insurance",
    status: "Survey Pending",
    progress: 60,
    officer: "Priya Patil",
    surveyor: "Anil Deshmukh",
    updated: "18 Jul 2026"
  },
  {
    id: "CLM-2026-1003",
    title: "Travel Insurance",
    status: "Under Review",
    progress: 40,
    officer: "Neha Kulkarni",
    surveyor: "-",
    updated: "17 Jul 2026"
  }
];

const ClaimStatus = () => {
  const [claims] = useState(sampleClaims);

  return (
    <DashboardLayout>
      <div className="claim-status-page">

        <h2>Claim Status</h2>

        <p>
          Track the current progress of all submitted claims.
        </p>

        {claims.map((claim) => (

          <div
            className="status-card"
            key={claim.id}
          >

            <div className="status-header">

              <div>

                <h3>{claim.id}</h3>

                <span>{claim.title}</span>

              </div>

              <div className="status-badge">

                {claim.status}

              </div>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${claim.progress}%`
                }}
              />

            </div>

            <div className="status-details">

              <div>

                <strong>Claim Officer</strong>

                <p>{claim.officer}</p>

              </div>

              <div>

                <strong>Surveyor</strong>

                <p>{claim.surveyor}</p>

              </div>

              <div>

                <strong>Last Updated</strong>

                <p>{claim.updated}</p>

              </div>

            </div>

          </div>

        ))}

      </div>
    </DashboardLayout>
  );
};

export default ClaimStatus;