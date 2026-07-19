import React from "react";
import "./ClaimPagination.css";

const ClaimPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="claim-pagination">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <div className="page-numbers">

        {pages.map((page) => (

          <button
            key={page}
            className={
              currentPage === page
                ? "page-btn active"
                : "page-btn"
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>

        ))}

      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default ClaimPagination;