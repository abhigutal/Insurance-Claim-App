import React, { useEffect, useState } from "react";
import axios from "axios";

const MyClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/claims/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setClaims(res.data.claims);
    };

    fetchClaims();
  }, []);

  return (
    <div>
      <h2>My Claims</h2>

      {claims.map((c) => (
        <div key={c.id} className="card">
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyClaims;