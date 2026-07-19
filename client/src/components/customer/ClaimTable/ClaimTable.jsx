import React from "react";
import "./ClaimTable.css";

import ClaimStatusBadge from "../ClaimStatusBadge/ClaimStatusBadge";

import {
  FaEye,
  FaDownload,
  FaTimes
} from "react-icons/fa";

const ClaimTable = ({
  claims,
  onView
}) => {

  return (

    <div className="claim-table-container">

      <table className="claim-table">

        <thead>

          <tr>

            <th>Claim ID</th>

            <th>Policy No</th>

            <th>Insurance</th>

            <th>Claim Type</th>

            <th>Amount</th>

            <th>Date</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {claims.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="empty-data"
              >

                No claims found.

              </td>

            </tr>

          ) : (

            claims.map((claim) => (

              <tr key={claim.id}>

                <td>{claim.claimId || claim.id}</td>

                <td>{claim.policyNo || "-"}</td>

                <td>{claim.policyType || claim.title}</td>

                <td>{claim.claimType || "-"}</td>

                <td>

                  {claim.amount
                    ? `₹${Number(claim.amount).toLocaleString()}`
                    : "-"}

                </td>

                <td>{claim.date || "-"}</td>

                <td>

                  <ClaimStatusBadge
                    status={claim.status}
                  />

                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="view-btn"
                      onClick={() => onView(claim)}
                    >

                      <FaEye />

                    </button>

                    <button
                      className="download-btn"
                    >

                      <FaDownload />

                    </button>

                    {claim.status === "Pending" && (

                      <button
                        className="cancel-btn"
                      >

                        <FaTimes />

                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

};

export default ClaimTable;