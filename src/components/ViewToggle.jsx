const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex items-center bg-gray-900/80 border border-gray-800 rounded-xl p-1 backdrop-blur-sm" id="view-toggle">
      <button
        onClick={() => onViewChange('gallery')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          viewMode === 'gallery'
            ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="gallery-view-btn"
        aria-label="Gallery view"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span className="hidden sm:inline">Gallery</span>
      </button>

      <button
        onClick={() => onViewChange('generator')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          viewMode === 'generator'
            ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="generator-view-btn"
        aria-label="Generator view"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span className="hidden sm:inline">Spotlight</span>
      </button>
    </div>
  );
};

export default ViewToggle;
