import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaBars,
  FaHome,
  FaFileAlt,
  FaClipboardCheck,
  FaSearch,
  FaUsers,
  FaChartBar,
  FaShieldAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const customerMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "My Claims",
      path: "/claims",
      icon: <FaFileAlt />,
    },
    {
      name: "Create Claim",
      path: "/createclaim",
      icon: <FaClipboardCheck />,
    },
    {
      name: "Claim Status",
      path: "/claimstatus",
      icon: <FaSearch />,
    },
    {
      name: "Policies",
      path: "/policies",
      icon: <FaShieldAlt />,
    },
  ];

  const officerMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Claim Review",
      path: "/review",
      icon: <FaClipboardCheck />,
    },
  ];

  const surveyorMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Assigned Claims",
      path: "/assigned-claims",
      icon: <FaClipboardCheck />,
    },
    {
      name: "Inspections",
      path: "/inspections",
      icon: <FaSearch />,
    },
    {
      name: "Submit Report",
      path: "/submit-report",
      icon: <FaClipboardCheck />,
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Claims",
      path: "/claims",
      icon: <FaFileAlt />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case "customer":
        return customerMenu;

      case "claimOfficer":
        return officerMenu;

      case "surveyor":
        return surveyorMenu;

      case "admin":
        return adminMenu;

      default:
        return [];
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${open ? "open" : "closed"}`}
    >
      <div className="top-section">
        {open && (
          <div className="logo">
            SureCare Insurance
          </div>
        )}

        <FaBars
          className="toggle-btn"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className="role-tag">
          {user?.role?.toUpperCase()}
        </div>
      )}

      <ul className="menu">
        {getMenuItems().map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
              onClick={() => setOpen(false)}
            >
              <span className="icon">
                {item.icon}
              </span>

              {open && (
                <span className="text">
                  {item.name}
                </span>
              )}

              {!open && (
                <span className="tooltip">
                  {item.name}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;