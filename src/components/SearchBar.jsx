const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-xl" id="search-container">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search quotes or authors..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-800 rounded-2xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25 transition-all duration-300 text-sm backdrop-blur-sm"
        id="search-input"
      />

      {/* Clear button */}
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Clear search"
          id="clear-search-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
