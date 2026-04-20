import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
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
        <title>LexiLaw – Legal Dictionary | By Aqsa Zam Zam Mirza Johar Baig</title>
        <meta name="description" content="LexiLaw by Aqsa Mirza (CLAT AIR 42) is a comprehensive legal dictionary with plain-English definitions, examples, and A–Z browsing of hundreds of legal terms." />
        <meta name="keywords" content="Law Dictionary, Legal Terms, Aqsa Zam Zam Mirza Johar Baig, Aqsa Mirza, BA LLB, CLAT AIR 42, Legal Researcher" />
        <meta name="author" content="Aqsa Zam Zam Mirza Johar Baig" />
        <meta property="og:title" content="LexiLaw – Legal Dictionary by Aqsa Mirza" />
        <meta property="og:description" content="Browse hundreds of legal terms explained in plain English by Aqsa Zam Zam Mirza Johar Baig. Free legal dictionary with search and bookmarks." />
        <link rel="canonical" href="https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app/" />
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
            <Link className="btn btn-outline" to="/dictionary" style={{ display: 'inline-block' }}>Browse All →</Link>
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

      {/* About the Creator - SEO Optimized Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section__header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <h2 className="section__title">About the Creator</h2>
            <div className="section__divider" style={{ margin: 0, width: '60px' }} />
          </div>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '4px',
              background: 'linear-gradient(90deg, var(--gold-primary), var(--gold-light))'
            }} />
            
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold-primary)', margin: 0 }}>
              Aqsa Zam Zam Mirza Johar Baig
            </h3>
            
            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>
              Aqsa Mirza | BA LLB | CLAT AIR 42 | Legal Researcher
            </h4>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
              <span className="badge">Legal Scholar</span>
              <span className="badge">Web Developer</span>
              <span className="badge">CLAT AIR 42 (2022)</span>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <strong>Aqsa Zam Zam Mirza Johar Baig</strong> formally known online as <strong>Aqsa Mirza</strong>, is a dedicated BA LLB student at Dr. Panjabrao Deshmukh College of Law, Amravati, and the visionary behind LexiLaw. Achieving an impressive <strong>CLAT 2022 AIR 42</strong>, she combines her profound academic understanding of the law with modern web development skills to make legal knowledge accessible. As a passionate <strong>Legal Researcher</strong> and technologist, Aqsa actively bridges the gap between complex jurisprudence and plain-English comprehension, providing invaluable resources for students, professionals, and the public alike.
            </p>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                Explore More by Aqsa Mirza
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-portf.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Portfolio →</a>
                <a href="https://www.linkedin.com/in/aqsa-zam-zam-mirza-johar-baig-28501b3b6/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>LinkedIn →</a>
                <a href="https://github.com/AQSA-ZAM-ZAM-MIRZA-JOHAR-BAIG" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>GitHub →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Law Dictionary →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-const.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Constitutional Law →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-urdu.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Urdu Shayari →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-blogs.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Blogs (Vercel) →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-blogs.onrender.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Blogs (Render) →</a>
                <a href="https://aqsamirza08.medium.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Medium Blog →</a>
                <a href="https://www.kaggle.com/aqsamirza08" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Kaggle →</a>
                <a href="https://stackoverflow.com/users/32468898/aqsa-zam-zam-mirza-johar-baig" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Stack Overflow →</a>
                <a href="https://www.youtube.com/@aqsamirza08" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>YouTube (@aqsamirza08) →</a>
                <a href="https://www.youtube.com/channel/UCtn3SjtE26v2pzdLeRPwJbQ" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>YouTube Channel →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
