import { useState } from 'react';
import { copyToClipboard, getTwitterShareUrl } from '../utils/helpers';

const SpotlightView = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  if (!quotes || quotes.length === 0) return null;
  const quote = quotes[currentIndex];

  const navigate = (direction) => {
    setAnimating(true);
    setCopied(false);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
      }
      setAnimating(false);
    }, 200);
  };

  const handleCopy = async () => {
    const text = `"${quote.content}" — ${quote.author}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    window.open(getTwitterShareUrl(quote.content, quote.author), '_blank', 'noopener,noreferrer');
  };

  const toggleLike = () => {
    setLiked((prev) => ({ ...prev, [quote.id]: !prev[quote.id] }));
  };

  const btnClass = "text-gray-400 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:text-white hover:bg-white/5 active:scale-95 flex items-center gap-2 cursor-pointer";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4" id="spotlight-view">
      <div className={`bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-2xl transition-all duration-300 p-8 md:p-12 lg:p-16 max-w-3xl w-full relative ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]" />

        <div className="text-amber-500/15 mb-4 animate-float">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        <blockquote className="relative z-10 mb-8">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-100 leading-snug font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
            &ldquo;{quote.content}&rdquo;
          </p>
        </blockquote>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-gray-950 font-bold text-lg">
            {quote.author.charAt(0)}
          </div>
          <div>
            <p className="text-amber-400 font-semibold text-lg">{quote.author}</p>
            {quote.tags && quote.tags.length > 0 && (
              <p className="text-gray-500 text-sm">{quote.tags.join(' · ')}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-6 border-t border-gray-800/60">
          <button onClick={toggleLike} className={`${btnClass} ${liked[quote.id] ? 'text-rose-400' : ''}`} id="spotlight-like-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={liked[quote.id] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {liked[quote.id] ? 'Liked' : 'Like'}
          </button>
          <button onClick={handleCopy} className={`${btnClass} ${copied ? 'text-emerald-400' : ''}`} id="spotlight-copy-btn">
            {copied ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            )}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleShare} className={`${btnClass} ml-auto`} id="spotlight-share-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            Share
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button onClick={() => navigate('prev')} className="w-12 h-12 rounded-full bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-2xl flex items-center justify-center hover:border-amber-500/30 transition-all cursor-pointer" id="spotlight-prev-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <span className="text-gray-500 text-sm font-medium tabular-nums">{currentIndex + 1} / {quotes.length}</span>
        <button onClick={() => navigate('next')} className="w-12 h-12 rounded-full bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-2xl flex items-center justify-center hover:border-amber-500/30 transition-all cursor-pointer" id="spotlight-next-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
};

export default SpotlightView;
