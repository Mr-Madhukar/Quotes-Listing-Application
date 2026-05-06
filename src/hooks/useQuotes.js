import { useState, useEffect } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes';

const useQuotes = (page = 1, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}?page=${page}&limit=${limit}`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
          setData(result.data.data || []);
          setPagination({
            page: result.data.page,
            totalPages: result.data.totalPages,
            totalItems: result.data.totalItems,
            hasNext: result.data.nextPage,
            hasPrev: result.data.previousPage,
          });
        } else {
          throw new Error(result.message || 'Failed to fetch quotes');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();

    return () => {
      abortController.abort();
    };
  }, [page, limit]);

  return { data, loading, error, pagination };
};

export default useQuotes;
