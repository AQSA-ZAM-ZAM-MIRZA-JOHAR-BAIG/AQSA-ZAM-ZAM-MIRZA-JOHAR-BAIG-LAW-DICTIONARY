import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { getTerms } from '../api/termsApi';
import AlphabetNav from '../components/AlphabetNav';
import TermCard from '../components/TermCard';
import { useSearch } from '../hooks/useSearch';

export default function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { query, setQuery, results, loading: searchLoading } = useSearch(300);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    getTerms({ limit: 6 })
      .then(({ data }) => {
        setFeatured(data.terms);
        setTotal(data.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <Helmet>
        <title>LexiLaw – Legal Dictionary | Plain-English Definitions of Legal Terms</title>
        <meta name="description" content="LexiLaw is a comprehensive legal dictionary with plain-English definitions, examples, and A–Z browsing of hundreds of legal terms. Free and fast." />
        <meta property="og:title" content="LexiLaw – Legal Dictionary" />
        <meta property="og:description" content="Browse hundreds of legal terms explained in plain English. Free legal dictionary with search and bookmarks." />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">The Legal Reference You Need</p>
          <h1 className="hero__title">Law, Explained<br />in Plain English</h1>
          <p className="hero__subtitle">
            Browse hundreds of legal terms — clearly defined with real-world examples. 
            Bookmark your favorites. Search instantly.
          </p>

          <div className="hero__search">
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <div className="search-input-wrap" style={{ borderRadius: '14px', padding: '14px 20px' }}>
                <span className="search-icon" style={{ fontSize: '1.2rem' }}>🔍</span>
                <input
                  id="hero-search"
                  className="search-input"
                  style={{ fontSize: '1rem' }}
                  type="text"
                  placeholder="Search any legal term — e.g. Habeas Corpus…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
                  onFocus={() => query && setSearchOpen(true)}
                  autoComplete="off"
                  aria-label="Search legal terms"
                />
                <button type="submit" className="btn btn-gold" style={{ padding: '8px 20px', flexShrink: 0 }}>Search</button>
              </div>

              {searchOpen && query && (
                <div className="search-dropdown search-wrap">
                  {searchLoading && <div className="search-dropdown-empty">Searching…</div>}
                  {!searchLoading && results.length === 0 && (
                    <div className="search-dropdown-empty">No terms found for "{query}"</div>
                  )}
                  {!searchLoading && results.map((t) => (
                    <div
                      key={t._id}
                      className="search-dropdown-item"
                      onClick={() => { setSearchOpen(false); navigate(`/terms/${t.slug}`); }}
                    >
                      <span className="search-dropdown-item__term">{t.term}</span>
                      <span className="search-dropdown-item__cat badge">{t.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="stats-bar">
            <div className="stat">
              <div className="stat__value">{total || '89'}+</div>
              <div className="stat__label">Legal Terms</div>
            </div>
            <div className="stat">
              <div className="stat__value">26</div>
              <div className="stat__label">Letters A–Z</div>
            </div>
            <div className="stat">
              <div className="stat__value">12</div>
              <div className="stat__label">Categories</div>
            </div>
            <div className="stat">
              <div className="stat__value">Free</div>
              <div className="stat__label">Always</div>
            </div>
          </div>
        </div>
      </section>

      {/* A-Z Browse */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Browse A–Z</h2>
          </div>
          <div className="section__divider" />
          <AlphabetNav active={null} onSelect={(l) => navigate(`/dictionary/${l}`)} />
        </div>
      </section>

      {/* Featured Terms */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Featured Terms</h2>
            <button className="btn btn-outline" onClick={() => navigate('/dictionary')}>Browse All →</button>
          </div>
          <div className="section__divider" />
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="term-grid">
              {featured.map((term, i) => (
                <TermCard key={term._id} term={term} style={{ animationDelay: `${i * 0.06}s` }} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
