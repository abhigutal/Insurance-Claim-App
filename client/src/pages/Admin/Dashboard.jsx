import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../Layout/DashboardLayout";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const claimsRes = await axios.get(
        "http://localhost:5000/api/admin/claims",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUsers(usersRes.data.users);
      setClaims(claimsRes.data.claims);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1>Admin Control Center</h1>

      <div className="cards">
        <div className="card">
          Total Users: {users.length}
        </div>

        <div className="card">
          Total Claims: {claims.length}
        </div>

        <div className="card">
          Pending Claims: {
            claims.filter(c => c.status === "pending").length
          }
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;