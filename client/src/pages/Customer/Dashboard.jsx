import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";

const CustomerDashboard = () => {
  return (
    <DashboardLayout>
      <h1>Customer Dashboard</h1>

      <div className="cards">
        <div className="card">
          Active Claims: 3
        </div>

        <div className="card">
          Pending Claims: 1
        </div>

        <div className="card">
          Approved: 5
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;