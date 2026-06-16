import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <h2>Insurance</h2>

      <p className="role-tag">
        {user?.role}
      </p>

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

      {user?.role === "customer" && (
        <>
          <NavLink to="/claims">
            My Claims
          </NavLink>

          <NavLink to="/policies">
            Policies
          </NavLink>
        </>
      )}

      {user?.role === "claimOfficer" && (
        <>
          <NavLink to="/review">
            Claim Review
          </NavLink>
        </>
      )}

      {user?.role === "surveyor" && (
        <>
          <NavLink to="/inspections">
            Inspections
          </NavLink>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <NavLink to="/users">
            Users
          </NavLink>

          <NavLink to="/claims">
            Claims
          </NavLink>

          <NavLink to="/reports">
            Reports
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;