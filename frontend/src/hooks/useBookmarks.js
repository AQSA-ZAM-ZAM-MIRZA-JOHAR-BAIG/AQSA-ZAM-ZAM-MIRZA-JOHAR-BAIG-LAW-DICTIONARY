import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'law_dict_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback((termId) => {
    setBookmarks((prev) =>
      prev.includes(termId) ? prev : [...prev, termId]
    );
  }, []);

  const removeBookmark = useCallback((termId) => {
    setBookmarks((prev) => prev.filter((id) => id !== termId));
  }, []);

  const toggleBookmark = useCallback((termId) => {
    setBookmarks((prev) =>
      prev.includes(termId)
        ? prev.filter((id) => id !== termId)
        : [...prev, termId]
    );
  }, []);

  const isBookmarked = useCallback(
    (termId) => bookmarks.includes(termId),
    [bookmarks]
  );

  return { bookmarks, addBookmark, removeBookmark, toggleBookmark, isBookmarked };
}
