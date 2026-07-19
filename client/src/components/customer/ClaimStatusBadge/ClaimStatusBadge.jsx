import React from "react";
import "./ClaimStatusBadge.css";

const ClaimStatusBadge = ({ status }) => {
  const getClassName = () => {
    switch (status) {
      case "Approved":
        return "badge approved";

      case "Pending":
        return "badge pending";

      case "Rejected":
        return "badge rejected";

      case "Active":
        return "badge active";

      case "Under Review":
        return "badge review";

      default:
        return "badge";
    }
  };

  return <span className={getClassName()}>{status}</span>;
};

export default ClaimStatusBadge;