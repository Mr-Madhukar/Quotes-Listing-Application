import { useState } from 'react';
import { copyToClipboard, getTwitterShareUrl } from '../utils/helpers';

const QuoteCard = ({ quote, index }) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `"${quote.content}" — ${quote.author}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    const url = getTwitterShareUrl(quote.content, quote.author);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const staggerClass = `stagger-${Math.min((index % 10) + 1, 10)}`;

  return (
    <article
      className={`bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-2xl transition-all duration-500 p-6 md:p-8 hover:border-amber-500/30 hover:shadow-amber-500/5 hover:shadow-2xl hover:-translate-y-1 group relative overflow-hidden animate-fade-in-up ${staggerClass} opacity-0`}
      id={`quote-${quote.id}`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-700" />

      {/* Large decorative quote mark */}
      <div className="absolute top-4 left-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors duration-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </div>

      {/* Quote content */}
      <blockquote className="relative z-10 mt-8 mb-6">
        <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;{quote.content}&rdquo;
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-gray-950 font-bold text-sm shrink-0">
          {quote.author.charAt(0)}
        </div>
        <span className="text-amber-400 font-medium text-sm tracking-wide">
          {quote.author}
        </span>
      </div>

      {/* Tags */}
      {quote.tags && quote.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {quote.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400/80 border border-amber-500/10 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-4 border-t border-gray-800/60">
        <button
          onClick={() => setLiked(!liked)}
          className={`text-gray-400 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:text-white hover:bg-white/5 active:scale-95 flex items-center gap-1.5 text-sm cursor-pointer ${liked ? 'text-rose-400 hover:text-rose-300' : ''}`}
          aria-label={liked ? 'Unlike quote' : 'Like quote'}
          id={`like-btn-${quote.id}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="hidden sm:inline">{liked ? 'Liked' : 'Like'}</span>
        </button>

        <button
          onClick={handleCopy}
          className={`text-gray-400 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:text-white hover:bg-white/5 active:scale-95 flex items-center gap-1.5 text-sm cursor-pointer ${copied ? 'text-emerald-400' : ''}`}
          aria-label="Copy quote"
          id={`copy-btn-${quote.id}`}
        >
          {copied ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          )}
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          onClick={handleShare}
          className="text-gray-400 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:text-white hover:bg-white/5 active:scale-95 flex items-center gap-1.5 text-sm ml-auto cursor-pointer"
          aria-label="Share on X"
          id={`share-btn-${quote.id}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </article>
  );
};

export default QuoteCard;
