import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../Layout/DashboardLayout";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/users",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setUsers(res.data.users);
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/admin/user/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchUsers();
  };

  const changeRole = async (id, role) => {
    await axios.put(
      "http://localhost:5000/api/admin/role",
      { id, role },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchUsers();
  };

  return (
    <DashboardLayout>
      <h2>User Management</h2>

      {users.map((u) => (
        <div key={u.id} className="card">
          <p>{u.full_name}</p>
          <p>{u.email}</p>
          <p>Role: {u.role}</p>

          <select
            value={u.role}
            onChange={(e) =>
              changeRole(u.id, e.target.value)
            }
          >
            <option value="customer">Customer</option>
            <option value="claimOfficer">Claim Officer</option>
            <option value="surveyor">Surveyor</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={() => deleteUser(u.id)}>
            Delete
          </button>
        </div>
      ))}
    </DashboardLayout>
  );
};

export default UserManagement;