import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";

const ClaimOfficerDashboard = () => {
  return (
    <DashboardLayout>
      <h1>Claim Officer Dashboard</h1>

      <div className="cards">
        <div className="card">
          Claims To Review: 12
        </div>

        <div className="card">
          Approved Today: 4
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClaimOfficerDashboard;