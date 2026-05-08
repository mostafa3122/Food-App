import React from 'react'

export default function PaginationComponent({ pageNumber, setPageNumber, totalPages }) {
    const visiblePages = 10;
    let startPage = Math.max(pageNumber - 5, 1);
    let endPage = startPage + visiblePages - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - visiblePages + 1, 1);
    }
    return (
        <div className="d-flex justify-content-center  align-items-center gap-2 my-4">
            {/* prev button */}
            <button className="btn btn-outline-success"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)} >
                Prev
            </button>
            {/* number of pages buttons */}
            {
                Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => startPage + index
                ).map((page) => (

                    <button
                        key={page}
                        className={`btn ${pageNumber === page
                                ? "btn-success"
                                : "btn-outline-success"
                            }`}
                        onClick={() => setPageNumber(page)}
                    >
                        {page}
                    </button>

                ))
            }
            {/* next buttons */}
            <button className="btn btn-outline-success"
                disabled={pageNumber === totalPages}
                onClick={() => setPageNumber(pageNumber + 1)} >
                Next
            </button>

        </div>
    )
}
