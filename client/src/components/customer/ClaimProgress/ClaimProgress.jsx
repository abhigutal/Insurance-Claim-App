import React from "react";
import "./ClaimProgress.css";
import { progressData } from "../dashboardData";
import {
  FaCheckCircle,
  FaRegCircle,
} from "react-icons/fa";

const ClaimProgress = () => {
  const completedStep = 3;

  return (
    <div className="claim-progress">

      <div className="progress-header">
        <h3>Claim Progress</h3>
        <span>75% Completed</span>
      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{ width: "75%" }}
        />

      </div>

      <div className="timeline">

        {progressData.map((step, index) => (

          <div
            className="timeline-item"
            key={index}
          >

            <div
              className={`timeline-icon ${
                index <= completedStep
                  ? "completed"
                  : ""
              }`}
            >

              {index <= completedStep ? (
                <FaCheckCircle />
              ) : (
                <FaRegCircle />
              )}

            </div>

            <div className="timeline-content">

              <h5>{step}</h5>

              <p>

                {index <= completedStep
                  ? "Completed"
                  : "Waiting"}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ClaimProgress;