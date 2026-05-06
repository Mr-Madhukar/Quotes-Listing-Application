# QuoteVault — Discover Inspiring Quotes

A premium quote browsing application built with **React + Vite + Tailwind CSS v4**, powered by the [FreeAPI](https://freeapi.app) Quotes endpoint.

![QuoteVault](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)

**Live Demo:** [https://quotes-listing-app.netlify.app/](https://quotes-listing-app.netlify.app/)

## ✨ Features

- **Gallery View** — Browse quotes in a responsive grid with glass-morphism cards  
- **Spotlight View** — Focus on one quote at a time with smooth navigation  
- **Search & Filter** — Real-time search across quote text, authors, and tags  
- **Like Quotes** — Toggle likes on your favorite quotes  
- **Copy to Clipboard** — One-click copy with visual feedback  
- **Share on X (Twitter)** — Instantly share quotes with attribution  
- **Skeleton Loaders** — Animated loading placeholders matching card layout  
- **Pagination** — Navigate through 30 pages of 300+ curated quotes  
- **Responsive Design** — Works beautifully on mobile, tablet, and desktop  
- **Dark Theme** — Premium dark UI with amber accent colors  

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Components & State |
| Vite 8 | Dev Server & Build |
| Tailwind CSS 4 | Utility-first Styling |
| FreeAPI | Quote Data Source |

## 📁 Project Structure

```
src/
├── components/
│   ├── QuoteCard.jsx      # Individual quote card with actions
│   ├── SearchBar.jsx      # Search input with clear button
│   ├── ViewToggle.jsx     # Gallery / Spotlight toggle
│   ├── Pagination.jsx     # Page navigation
│   ├── SpotlightView.jsx  # Single-quote focus view
│   └── SkeletonCard.jsx   # Loading skeleton placeholders
├── hooks/
│   └── useQuotes.js       # Custom hook: API fetch + pagination + AbortController
├── utils/
│   └── helpers.js         # Clipboard, Twitter share, text utilities
├── App.jsx                # Main application component
├── main.jsx               # React entry point
└── index.css              # Global styles & animations
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📡 API

**Endpoint:** `https://api.freeapi.app/api/v1/public/quotes`  
**Pagination:** `?page=1&limit=10`  
**Response fields:** `content`, `author`, `tags`, `authorSlug`, `id`

## 📝 Key Implementation Details

- **`useQuotes` hook** — Fetches quotes with `AbortController` cleanup on unmount/page change
- **`useMemo` filtering** — Efficient client-side search across quote text, author, and tags
- **Staggered animations** — Cards fade in with sequential delays for visual polish
- **Clipboard API** — With fallback for older browsers using `execCommand`

## 🌐 Deployment

Deployed on [Vercel](https://vercel.com) for instant, zero-config hosting.

---

Built for **ChaiCode Web Dev Cohort 2026** · Powered by [FreeAPI](https://freeapi.app)
