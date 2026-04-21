import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../api/termsApi';
import { useBookmarks } from '../hooks/useBookmarks';
import TermCard from '../components/TermCard';

const BASE_URL = 'https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function BookmarksPage() {
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

  const pageTitle = 'My Bookmarks – LexiLaw Legal Dictionary';
  const metaDesc = 'Your saved legal terms on LexiLaw. Quick access to bookmarked legal definitions. LexiLaw provides plain-English definitions for complex legal terminology.';
  const canonicalUrl = `${BASE_URL}/bookmarks`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Bookmarks are user-specific, generally noindex */}
        <meta name="robots" content="noindex" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LexiLaw Legal Dictionary" />

        {/* X (Twitter) Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aqsamirza08" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold-primary)', marginBottom: 8 }}>
            🔖 My Bookmarks
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {bookmarks.length} saved term{bookmarks.length !== 1 ? 's' : ''} — stored locally in your browser. LexiLaw is your free legal reference.
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
              <h2 className="empty-state__title">No bookmarks yet</h2>
              <p className="empty-state__sub">Click the bookmark icon on any term to save it here for quick reference.</p>
              <Link
                className="btn btn-gold"
                style={{ marginTop: 20, display: 'inline-block' }}
                to="/dictionary"
              >
                Browse Dictionary
              </Link>
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
