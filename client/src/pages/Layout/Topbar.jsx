import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Topbar.css";
import {  FaSignOutAlt } from "react-icons/fa";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => { const handleClickOutside = (event) => 
    { 
      if ( topbarRef.current && !topbarRef.current.contains(event.target) ) 
        { setOpen(false); } 
    }; 
      document.addEventListener("mousedown", handleClickOutside); 
      return () => { 
        document.removeEventListener("mousedown", handleClickOutside); 
      }; 
    }, 
    []);

  return (
    <div className="topbar">
      <div>
        Welcome, {user?.fullName || "User"}
      </div>

      <button className="logout-btn" onClick={logout}>
       <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Topbar;