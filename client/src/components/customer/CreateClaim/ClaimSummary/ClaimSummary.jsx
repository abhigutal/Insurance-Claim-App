import "./ClaimSummary.css";

const ClaimSummary = ({ values }) => {

    return (

        <div className="claim-summary">

            <h3>Review Claim</h3>

            <div>

                <strong>Policy :</strong>

                {values.policyNo}

            </div>

            <div>

                <strong>Claim Type :</strong>

                {values.claimType}

            </div>

            <div>

                <strong>Amount :</strong>

                ₹{values.amount}

            </div>

            <div>

                <strong>Description :</strong>

                {values.description}

            </div>

        </div>

    );

};

export default ClaimSummary;