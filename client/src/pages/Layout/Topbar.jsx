import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaUser,
  FaCogs,
  FaSignOutAlt,
  FaChevronDown,
  FaUserCog
} from "react-icons/fa";

import "./Topbar.css";

const Topbar = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const topbarRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        topbarRef.current &&
        !topbarRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const avatarLetter =
    user?.fullName?.charAt(0).toUpperCase() || "U";

  return (

    <div className="topbar">

      <div className="welcome-text">

        Welcome,

        <strong>

          {" "}
          {user?.fullName || "User"}

        </strong>

      </div>

      <div
        className="profile-menu"
        ref={topbarRef}
      >

        <button
          className="avatar-btn"
          onClick={() => setOpen(!open)}
        >

          <div className="avatar-circle">

            {avatarLetter}

          </div>

          <FaChevronDown className="arrow"/>

        </button>

        {open && (

          <div className="dropdown-menu">

            <button
              onClick={() => {

                navigate("/customer/profile");

                setOpen(false);

              }}
            >

              <FaUser />

              Profile

            </button>

            <button
              onClick={() => {

                navigate("/customer/settings");

                setOpen(false);

              }}
            >

              <FaCogs />

              Settings

            </button>

            <hr />

            <button
              className="logout-btn"
              onClick={logout}
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default Topbar;