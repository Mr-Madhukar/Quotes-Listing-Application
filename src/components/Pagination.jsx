const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  if (totalPages <= 1) return null;

  const btnGhost = "text-gray-400 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:text-white hover:bg-white/5 active:scale-95 cursor-pointer";

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination" id="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
        className={`${btnGhost} flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed`}
        id="prev-page-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      <div className="flex items-center gap-1">
        {pages[0] > 1 && (
          <>
            <button onClick={() => onPageChange(1)} disabled={loading} className={`${btnGhost} w-10 h-10 flex items-center justify-center text-sm rounded-xl`}>1</button>
            {pages[0] > 2 && <span className="text-gray-600 px-1">…</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={loading}
            className={`w-10 h-10 flex items-center justify-center text-sm rounded-xl font-medium transition-all duration-300 cursor-pointer ${
              page === currentPage
                ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/20'
                : btnGhost
            }`}
            id={`page-btn-${page}`}
          >
            {page}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-600 px-1">…</span>}
            <button onClick={() => onPageChange(totalPages)} disabled={loading} className={`${btnGhost} w-10 h-10 flex items-center justify-center text-sm rounded-xl`}>{totalPages}</button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || loading}
        className={`${btnGhost} flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed`}
        id="next-page-btn"
      >
        <span className="hidden sm:inline">Next</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
