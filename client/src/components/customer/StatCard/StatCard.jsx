import React from "react";
import "./StatCard.css";

const StatCard = ({ data }) => {
  const Icon = data.icon;

  return (
    <div className="stat-card">

      <div
        className="stat-icon"
        style={{
          background: data.bg,
          color: data.color,
        }}
      >
        <Icon />
      </div>

      <div className="stat-info">

        <h4>{data.title}</h4>

        <h2>{data.value}</h2>

        <span className="trend positive">
          +12% This Month
        </span>

      </div>

    </div>
  );
};

export default StatCard;