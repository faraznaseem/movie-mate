const Pagination = ({ totalPages, setPageNumber, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {pages.map((pageNumber, index) =>
        pageNumber < 6 ||
        pageNumber > totalPages - 2 ||
        Math.abs(pageNumber - currentPage) <= 2 ? (
          <button
            key={pageNumber}
            className={`px-8 py-4 rounded-md
                            ${
                              pageNumber === currentPage
                                ? "bg-blue-800 text-white font-bold cursor-pointer"
                                : "bg-dark-100 text-white font-bold cursor-pointer"
                            }
                            hover:bg-blue-950 transition`}
            onClick={() => setPageNumber(pageNumber)}
          >
            {pageNumber}
          </button>
        ) : pageNumber === 6 ? (
          <span key={pageNumber} className="px-8 text-gray-400">
            ...
          </span>
        ) : null
      )}
    </div>
  );
};

export default Pagination;
