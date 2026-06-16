import React from "react";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="topbar">
      <div>
        Welcome, {user?.fullName || "User"}
      </div>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Topbar;