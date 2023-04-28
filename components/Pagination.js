//make a pagination component for products

import React from "react";

export default function Pagination({ page, total, PER_PAGE, onPageChange }) {


    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="flex justify-center items-center my-10">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {page > 1 && (
                    <button
                        onClick={() => onPageChange(page - 1)}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
                {range(1, total).map((x, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(x)}
                        className={
                            x === page
                                ? "bg-gray-200 border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        }
                    >
                        {x}
                    </button>
                ))}
                {page !== total && (
                    <button
                        onClick={() => onPageChange(page + 1)}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
            </nav>
        </div>
    );
}
