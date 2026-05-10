import useRandomQuote from './hooks/useRandomQuote';

function App() {
  const { quote, loading, error, fetchQuote } = useRandomQuote();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eadecc] to-[#f5eedf] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#fdfbf7] rounded-3xl shadow-xl p-6 sm:p-8 transform transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-4 h-4 rounded-full bg-[#7a4b31]"></div>
          <h1 className="text-2xl font-black text-[#5a3a22] tracking-wide">
            Random Quotes
          </h1>
        </div>

        {/* Content Box */}
        <div className="bg-[#f8f4ec] border border-[#dcccae] rounded-2xl p-6 mb-6 min-h-[200px] flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full animate-pulse space-y-4">
              <div className="w-full h-4 bg-[#e8decd] rounded"></div>
              <div className="w-5/6 h-4 bg-[#e8decd] rounded"></div>
              <div className="w-3/4 h-4 bg-[#e8decd] rounded"></div>
              <div className="w-1/2 h-4 bg-[#e8decd] rounded mt-4"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-800 font-medium">
              <p>Oops! Failed to load quote.</p>
              <p className="text-sm mt-2 opacity-80">{error}</p>
            </div>
          ) : quote ? (
            <div className="flex flex-col h-full animate-fade-in">
              <blockquote className="text-[#5a3a22] text-lg leading-relaxed mb-6 font-medium">
                "{quote.content}"
              </blockquote>
              <div className="mt-auto flex items-center gap-2 text-[#7a4b31] font-semibold text-sm">
                <span className="text-lg">✍️</span> Author: {quote.author}
              </div>
            </div>
          ) : (
            <div className="text-center text-[#7a4b31] font-medium">
              No quote available.
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="w-full bg-gradient-to-b from-[#6b422a] to-[#4a2e1d] hover:from-[#7a4b31] hover:to-[#5a3a22] text-[#fdfbf7] font-bold py-4 rounded-xl shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
        >
          {loading ? 'Loading...' : 'Get New Quote'}
        </button>
      </div>
    </div>
  );
}

export default App;
