import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";

const CustomerDashboard = () => {
  return (
    <DashboardLayout>
      <h1>Customer Dashboard</h1>

      <div className="cards">
        <div className="card">
          Active Claims: 
        </div>

        <div className="card">
          Pending Claims: 
        </div>

        <div className="card">
          Approved: 
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;