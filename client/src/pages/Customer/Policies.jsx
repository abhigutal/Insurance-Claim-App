import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import "./Policies.css";

const policyData = [
  {
    id: 1,
    policyNo: "POL-100245",
    policyName: "Health Insurance",
    premium: "₹12,500 / Year",
    coverage: "₹5,00,000",
    expiry: "20 Dec 2027",
    status: "Active"
  },
  {
    id: 2,
    policyNo: "POL-100873",
    policyName: "Vehicle Insurance",
    premium: "₹8,900 / Year",
    coverage: "₹3,00,000",
    expiry: "10 Mar 2027",
    status: "Active"
  },
  {
    id: 3,
    policyNo: "POL-100999",
    policyName: "Travel Insurance",
    premium: "₹2,500",
    coverage: "₹10,00,000",
    expiry: "15 Aug 2026",
    status: "Expired"
  }
];

const Policies = () => {

  const [search, setSearch] = useState("");

  const filteredPolicies = policyData.filter(policy =>
    policy.policyName.toLowerCase().includes(search.toLowerCase()) ||
    policy.policyNo.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <DashboardLayout>

      <div className="policies-page">

        <div className="policy-header">

          <div>

            <h2>My Policies</h2>

            <p>
              View and manage all your insurance policies.
            </p>

          </div>

          <input
            type="text"
            placeholder="Search Policy..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <div className="policy-grid">

          {filteredPolicies.map(policy=>(

            <div
              className="policy-card"
              key={policy.id}
            >

              <div className="policy-top">

                <h3>{policy.policyName}</h3>

                <span
                  className={
                    policy.status==="Active"
                    ? "active"
                    : "expired"
                  }
                >
                  {policy.status}
                </span>

              </div>

              <p>

                <strong>Policy No:</strong>

                {policy.policyNo}

              </p>

              <p>

                <strong>Coverage:</strong>

                {policy.coverage}

              </p>

              <p>

                <strong>Premium:</strong>

                {policy.premium}

              </p>

              <p>

                <strong>Expiry:</strong>

                {policy.expiry}

              </p>

              <div className="policy-actions">

                <button className="download-btn">

                  Download

                </button>

                <button className="renew-btn">

                  Renew

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Policies;