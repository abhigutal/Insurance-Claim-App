import "./ClaimStepper.css";

const steps = [
    "Claim Details",
    "Documents",
    "Review",
    "Submit"
];

const ClaimStepper = ({ currentStep }) => {

    return (

        <div className="claim-stepper">

            {steps.map((step, index) => (

                <div
                    key={step}
                    className={`step ${
                        currentStep >= index + 1
                            ? "active"
                            : ""
                    }`}
                >

                    <div className="step-number">

                        {index + 1}

                    </div>

                    <span>{step}</span>

                </div>

            ))}

        </div>

    );

};

export default ClaimStepper;