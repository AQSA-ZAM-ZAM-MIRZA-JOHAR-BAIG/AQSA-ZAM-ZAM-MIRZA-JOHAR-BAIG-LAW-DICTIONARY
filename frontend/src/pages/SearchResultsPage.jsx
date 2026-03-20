import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchTerms } from '../api/termsApi';
import TermCard from '../components/TermCard';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get('q') || '';
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) return;
    setLoading(true);
    searchTerms(q)
      .then(({ data }) => setTerms(data.terms || []))
      .catch(() => setTerms([]))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <>
      <Helmet>
        <title>{q ? `"${q}" – Search Results` : 'Search'} | LexiLaw Legal Dictionary</title>
        <meta name="description" content={`Search results for "${q}" in the LexiLaw legal dictionary.`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 8 }}>Search results for</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold-primary)' }}>
            "{q}"
          </h1>
          {!loading && (
            <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>
              {terms.length} result{terms.length !== 1 ? 's' : ''} found
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
              <p className="empty-state__title">No results for "{q}"</p>
              <p className="empty-state__sub">Try a different search term or browse the full dictionary.</p>
              <button
                className="btn btn-gold"
                style={{ marginTop: 20 }}
                onClick={() => navigate('/dictionary')}
              >
                Browse Dictionary
              </button>
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
