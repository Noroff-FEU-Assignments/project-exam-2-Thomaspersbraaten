import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Pagination({ offset, setOffset }) {
  const [pageNumber, setPageNumber] = useState(1);
  // const calculatePageNumber = () => {
  //   console.log(offset);
  //   const page = offset / 15;
  //   if (page === 0) {
  //     return 1;
  //   } else {
  //     return offset / 15;
  //   }
  // };
  const currentPage = Math.ceil((offset + 1) / 15);

  // console.log(calculatePageNumber());
  return (
    <div className="pagination">
      {/* <Button>{pageNumber}</Button> */}
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
