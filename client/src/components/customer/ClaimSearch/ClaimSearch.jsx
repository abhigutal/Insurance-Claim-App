import React from "react";
import "./ClaimSearch.css";
import { FaSearch } from "react-icons/fa";

const ClaimSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="claim-search">

      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search by Claim ID, Policy Number or Insurance Type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>
  );
};

export default ClaimSearch;