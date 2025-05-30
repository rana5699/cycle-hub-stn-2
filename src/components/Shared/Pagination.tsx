// components/Pagination.tsx
import { getPagination } from "@/utils/paginationUtils";
import React from "react";

type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

interface PaginationProps {
  meta: Meta;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta }) => {
  const {
    currentPage,
    pages,
    hasNextPage,
    hasPreviousPage,
    // nextPage,
    // previousPage,
  } = getPagination(meta);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={!hasPreviousPage}
        // onClick={() => previousPage && onPageChange(previousPage)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
        //   onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={!hasNextPage}
        // onClick={() => nextPage && onPageChange(nextPage)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
