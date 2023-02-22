import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";

function Pagination({ offset, setOffset }) {
  const currentPage = Math.ceil((offset + 1) / 15);

  return (
    <div className="pagination">
      <Button
        className="pagination__button prev"
        variant="warning"
        disabled={offset === 0}
        onClick={() => {
          setOffset(offset - 15);
        }}
      >
        Prev
      </Button>
      <p className="pagination__page-number">Page {currentPage} </p>

      <Button
        className="pagination__button next"
        onClick={() => {
          setOffset(offset + 15);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
