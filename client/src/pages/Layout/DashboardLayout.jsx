import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "./layout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;