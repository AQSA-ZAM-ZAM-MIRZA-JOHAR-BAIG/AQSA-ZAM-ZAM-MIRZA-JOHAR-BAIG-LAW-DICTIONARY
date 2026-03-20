import { useState, useEffect, useRef } from 'react';
import { searchTerms } from '../api/termsApi';

export function useSearch(debounceMs = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const { data } = await searchTerms(query);
        setResults(data.terms || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  return { query, setQuery, results, loading };
}
