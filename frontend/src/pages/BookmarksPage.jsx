import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { getBookmarks } from '../api/termsApi';
import { useBookmarks } from '../hooks/useBookmarks';
import TermCard from '../components/TermCard';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();
  const bookmarksKey = [...bookmarks].sort().join(',');
  const [resultsByBookmarks, setResultsByBookmarks] = useState({});

  useEffect(() => {
    if (bookmarks.length === 0 || resultsByBookmarks[bookmarksKey] !== undefined) return;

    let cancelled = false;
    getBookmarks(bookmarks)
      .then(({ data }) => {
        if (!cancelled) {
          setResultsByBookmarks((prev) => ({ ...prev, [bookmarksKey]: data.terms || [] }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResultsByBookmarks((prev) => ({ ...prev, [bookmarksKey]: [] }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [bookmarks, bookmarksKey, resultsByBookmarks]);

  const terms = bookmarks.length === 0 ? [] : (resultsByBookmarks[bookmarksKey] ?? []);
  const loading = bookmarks.length > 0 && resultsByBookmarks[bookmarksKey] === undefined;

  return (
    <>
      <Helmet>
        <title>My Bookmarks – LexiLaw Legal Dictionary</title>
        <meta name="description" content="Your saved legal terms on LexiLaw. Quick access to bookmarked legal definitions." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold-primary)', marginBottom: 8 }}>
            🔖 My Bookmarks
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {bookmarks.length} saved term{bookmarks.length !== 1 ? 's' : ''} — stored in your browser
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner" />
          ) : terms.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">📄</span>
              <p className="empty-state__title">No bookmarks yet</p>
              <p className="empty-state__sub">Click the bookmark icon on any term to save it here.</p>
              <button
                className="btn btn-gold"
                style={{ marginTop: 20 }}
                onClick={() => navigate('/dictionary')}
              >
                Browse Dictionary
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button
                  className="btn btn-outline"
                  style={{ color: 'var(--danger)', borderColor: 'var(--danger)', fontSize: '0.8rem' }}
                  onClick={() => {
                    if (confirm('Clear all bookmarks?')) bookmarks.forEach(removeBookmark);
                  }}
                >
                  Clear All
                </button>
              </div>
              <div className="term-grid">
                {terms.map((term, i) => (
                  <TermCard key={term._id} term={term} style={{ animationDelay: `${i * 0.06}s` }} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
