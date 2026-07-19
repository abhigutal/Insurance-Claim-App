import React from "react";
import "./ClaimFilter.css";
import { claimFilters } from "../claimsData";

const ClaimFilter = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="claim-filter">

      {claimFilters.map((filter) => (

        <button
          key={filter}
          className={
            activeFilter === filter
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>

      ))}

    </div>
  );
};

export default ClaimFilter;