import React from "react";
import "./DashboardHeader.css";
import { FaBell } from "react-icons/fa";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">

      <div>

        <h2>Customer Dashboard</h2>

        <p>
          Monitor your insurance claims and policies from one place.
        </p>

      </div>

      <button className="notification-btn">

        <FaBell />

        <span className="notification-count">3</span>

      </button>

    </div>
  );
};

export default DashboardHeader;