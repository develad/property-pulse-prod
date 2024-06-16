import React from 'react';

const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const toatalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= toatalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className={`mr-2 px-4 py-2 border border-gray-300 rounded-xl ${
          page !== 1 && 'hover:bg-blue-400'
        } transition-all disabled:opacity-50`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {toatalPages}
      </span>
      <button
        className={`ml-2 px-4 py-2 border border-gray-300 rounded-xl ${
          page !== toatalPages && 'hover:bg-blue-400'
        } transition-all disabled:opacity-50`}
        disabled={page === toatalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
