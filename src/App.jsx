import { useState, useMemo } from 'react';
import useQuotes from './hooks/useQuotes';
import QuoteCard from './components/QuoteCard';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import Pagination from './components/Pagination';
import SkeletonGrid from './components/SkeletonCard';
import SpotlightView from './components/SpotlightView';

function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('gallery');

  const { data: quotes, loading, error, pagination } = useQuotes(page, 10);

  // Filter quotes by search query using useMemo
  const filteredQuotes = useMemo(() => {
    if (!searchQuery.trim()) return quotes;
    const q = searchQuery.toLowerCase();
    return quotes.filter(
      (quote) =>
        quote.content.toLowerCase().includes(q) ||
        quote.author.toLowerCase().includes(q) ||
        (quote.tags && quote.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [quotes, searchQuery]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/3 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-600/2 rounded-full blur-[80px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Header */}
        <header className="text-center mb-12 md:mb-16" id="app-header">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            QuoteVault
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Discover{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Inspiring
            </span>{' '}
            Quotes
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Browse {pagination.totalItems || 300}+ curated quotes from legendary authors.
            Search, save, and share the words that move you.
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8" id="toolbar">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-red-500/20 shadow-2xl rounded-2xl p-8 text-center mb-8" id="error-state">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button onClick={() => handlePageChange(page)} className="bg-amber-500 text-gray-950 px-5 py-2.5 rounded-xl font-semibold tracking-wide transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 cursor-pointer">
              Try Again
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && !error && <SkeletonGrid count={6} />}

        {/* Content */}
        {!loading && !error && (
          <>
            {filteredQuotes.length === 0 ? (
              /* Empty state */
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-2xl p-12 text-center" id="empty-state">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">No quotes found</h2>
                <p className="text-gray-400">
                  No quotes match &ldquo;{searchQuery}&rdquo;. Try a different search term.
                </p>
              </div>
            ) : viewMode === 'generator' ? (
              <SpotlightView quotes={filteredQuotes} />
            ) : (
              /* Gallery grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="quotes-grid">
                {filteredQuotes.map((quote, index) => (
                  <QuoteCard key={quote.id} quote={quote} index={index} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!loading && !error && !searchQuery && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800/50 text-center" id="app-footer">
          <p className="text-gray-600 text-sm">
            Built with React &middot; Powered by{' '}
            <a href="https://freeapi.app" target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400 transition-colors">
              FreeAPI
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
