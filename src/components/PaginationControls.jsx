"use client";

export default function PaginationControls({ page, setPage, totalPages = 1 }) {
  const safeTotalPages = Math.max(1, totalPages);

  const goToPage = (num) => {
    if (num >= 1 && num <= safeTotalPages) setPage(num);
  };

  return (
    <div className="flex max-w-full flex-wrap items-center gap-1 text-xs font-medium sm:inline-flex sm:gap-2">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className="px-2 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 sm:py-1"
      >
        Previous
      </button>

      {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((num) => {
        if (
          num <= 2 ||
          num > safeTotalPages - 2 ||
          (num >= page - 1 && num <= page + 1)
        ) {
          return (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
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
          (num === page + 2 && page < safeTotalPages - 3)
        ) {
          return (
            <span
              key={num}
              className="flex h-8 w-8 items-center justify-center text-gray-400"
            >
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === safeTotalPages}
        className="px-2 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 sm:py-1"
      >
        Next
      </button>
    </div>
  );
}
