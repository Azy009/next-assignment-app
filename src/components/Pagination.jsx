import React from 'react';

export const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  limit = 5, 
  onLimitChange 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const safeTotal = Math.max(1, totalPages);

    if (safeTotal <= 7) {
      for (let i = 1; i <= safeTotal; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(safeTotal);
      } else if (currentPage >= safeTotal - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = safeTotal - 4; i <= safeTotal; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(safeTotal);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-gray-600">
      {onLimitChange && (
        <div className="relative">
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="appearance-none bg-gray-100/90 border border-gray-200/90 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      <div className="inline-flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden text-xs divide-x divide-gray-200 shadow-2xs">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="px-3.5 py-2 font-normal text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none cursor-pointer"
        >
          Previous
        </button>

        {pages.map((item, idx) => {
          if (item === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400 select-none">
                ...
              </span>
            );
          }

          const pageNum = Number(item);
          const isActive = currentPage === pageNum;

          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 transition-colors focus:outline-none cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-bold bg-blue-50/50'
                  : 'text-gray-600 font-normal hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="px-3.5 py-2 font-normal text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
