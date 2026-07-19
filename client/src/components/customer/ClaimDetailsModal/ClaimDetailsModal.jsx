import React from "react";
import "./ClaimDetailsModal.css";
import ClaimStatusBadge from "../ClaimStatusBadge/ClaimStatusBadge";
import { FaTimes } from "react-icons/fa";

const ClaimDetailsModal = ({
  claim,
  onClose,
}) => {

  if (!claim) return null;

  return (

    <div className="modal-overlay">

      <div className="claim-modal">

        <div className="modal-header">

          <h2>Claim Details</h2>

          <button onClick={onClose}>

            <FaTimes />

          </button>

        </div>

        <div className="modal-body">

          <div className="detail-grid">

            <div>
              <label>Claim ID</label>
              <p>{claim.claimId}</p>
            </div>

            <div>
              <label>Policy Number</label>
              <p>{claim.policyNo}</p>
            </div>

            <div>
              <label>Insurance</label>
              <p>{claim.policyType}</p>
            </div>

            <div>
              <label>Claim Type</label>
              <p>{claim.claimType}</p>
            </div>

            <div>
              <label>Amount</label>
              <p>₹{claim.amount.toLocaleString()}</p>
            </div>

            <div>
              <label>Status</label>

              <ClaimStatusBadge
                status={claim.status}
              />

            </div>

            <div>
              <label>Claim Officer</label>
              <p>{claim.officer}</p>
            </div>

            <div>
              <label>Surveyor</label>
              <p>{claim.surveyor}</p>
            </div>

            <div>
              <label>Hospital</label>
              <p>{claim.hospital}</p>
            </div>

            <div>
              <label>Incident Date</label>
              <p>{claim.incidentDate}</p>
            </div>

          </div>

          <div className="remarks">

            <label>Remarks</label>

            <p>{claim.remarks}</p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ClaimDetailsModal;