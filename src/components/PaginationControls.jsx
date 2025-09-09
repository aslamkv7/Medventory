'use client'
import { useState } from "react";

export default function PaginationControls({page, setPage}) {
  const totalPages = 88; // example total pages

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };



  return (
    <div className="inline-flex items-center gap-2 text-xs font-medium">
  {/* Previous */}
  <button
    onClick={() => goToPage(page - 1)}
    disabled={page === 1}
    className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
  >
    Previous
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
    if (
      num <= 2 ||
      num > totalPages - 2 ||
      (num >= page - 1 && num <= page + 1)
    ) {
      return (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={`w-6 h-6 flex items-center justify-center rounded-full ${
            page === num
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {num}
        </button>
      );
    }
    if (
      (num === page - 2 && page > 4) ||
      (num === page + 2 && page < totalPages - 3)
    ) {
      return (
        <span key={num} className="w-8 h-8 flex items-center justify-center text-gray-400">
          ...
        </span>
      );
    }
    return null;
  })}

  {/* Next */}
  <button
    onClick={() => goToPage(page + 1)}
    disabled={page === totalPages}
    className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
  >
    Next
  </button>
</div>
  );
}
