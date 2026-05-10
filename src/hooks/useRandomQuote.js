import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

export const useRandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (result.success) {
        setQuote(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch quote');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return { quote, loading, error, fetchQuote };
};

export default useRandomQuote;
