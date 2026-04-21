import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { searchTerms } from '../api/termsApi';
import TermCard from '../components/TermCard';

const BASE_URL = 'https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const normalizedQuery = q.trim().toLowerCase();
  const [resultsByQuery, setResultsByQuery] = useState({});

  useEffect(() => {
    if (!normalizedQuery || resultsByQuery[normalizedQuery] !== undefined) return;

    let cancelled = false;
    searchTerms(q)
      .then(({ data }) => {
        if (!cancelled) {
          setResultsByQuery((prev) => ({ ...prev, [normalizedQuery]: data.terms || [] }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResultsByQuery((prev) => ({ ...prev, [normalizedQuery]: [] }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [normalizedQuery, q, resultsByQuery]);

  const terms = normalizedQuery ? (resultsByQuery[normalizedQuery] ?? []) : [];
  const loading = Boolean(normalizedQuery) && resultsByQuery[normalizedQuery] === undefined;

  const pageTitle = q ? `"${q}" – Search Results` : 'Search';
  const metaDesc = `Search results for "${q}" in the LexiLaw legal dictionary. Find plain-English definitions for hundreds of legal terms.`;
  const canonicalUrl = `${BASE_URL}/search?q=${encodeURIComponent(q)}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | LexiLaw Legal Dictionary</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Search results generally shouldn't be indexed, but if they are, they need tags */}
        <meta name="robots" content="noindex" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${pageTitle} | LexiLaw`} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LexiLaw Legal Dictionary" />

        {/* X (Twitter) Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aqsamirza08" />
        <meta name="twitter:title" content={`${pageTitle} | LexiLaw`} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 8 }}>Search results for</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold-primary)' }}>
            "{q}"
          </h1>
          {!loading && (
            <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>
              {terms.length} result{terms.length !== 1 ? 's' : ''} found in the LexiLaw dictionary. LexiLaw provides plain-English definitions for legal terminology.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner" />
          ) : terms.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">🔍</span>
              <h2 className="empty-state__title">No results for "{q}"</h2>
              <p className="empty-state__sub">Try a different search term or browse the full dictionary to find the legal definition you need.</p>
              <Link
                className="btn btn-gold"
                style={{ marginTop: 20, display: 'inline-block' }}
                to="/dictionary"
              >
                Browse Dictionary
              </Link>
            </div>
          ) : (
            <div className="term-grid">
              {terms.map((term, i) => (
                <TermCard key={term._id} term={term} style={{ animationDelay: `${i * 0.06}s` }} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
