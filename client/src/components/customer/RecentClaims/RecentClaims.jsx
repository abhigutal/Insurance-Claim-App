import React from "react";
import "./RecentClaims.css";
import { recentClaims } from "../dashboardData";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";

const statusIcon = (status) => {
  switch (status) {
    case "Approved":
      return <FaCheckCircle />;
    case "Pending":
      return <FaClock />;
    default:
      return <FaClipboardList />;
  }
};

const statusClass = (status) => {
  switch (status) {
    case "Approved":
      return "approved";
    case "Pending":
      return "pending";
    default:
      return "active";
  }
};

const RecentClaims = () => {
  return (
    <div className="recent-claims">

      <div className="recent-header">

        <h3>Recent Claims</h3>

        <button>View All</button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Claim ID</th>

            <th>Policy</th>

            <th>Amount</th>

            <th>Date</th>

            <th>Status</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {recentClaims.map((claim) => (

            <tr key={claim.id}>

              <td>{claim.id}</td>

              <td>{claim.policy}</td>

              <td>{claim.amount}</td>

              <td>{claim.date}</td>

              <td>

                <span
                  className={`status ${statusClass(claim.status)}`}
                >
                  {statusIcon(claim.status)}
                  {claim.status}
                </span>

              </td>

              <td>

                <button className="view-btn">

                  <FaArrowRight />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentClaims;