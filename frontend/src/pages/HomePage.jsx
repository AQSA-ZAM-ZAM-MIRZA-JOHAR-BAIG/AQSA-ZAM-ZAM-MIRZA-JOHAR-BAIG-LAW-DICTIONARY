import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { getTerms } from '../api/termsApi';
import AlphabetNav from '../components/AlphabetNav';
import TermCard from '../components/TermCard';
import { useSearch } from '../hooks/useSearch';

const BASE_URL = 'https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

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
        <meta name="description" content="LexiLaw by Aqsa Mirza (CLAT AIR 42) is a comprehensive legal dictionary with plain-English definitions, examples, and A–Z browsing of hundreds of legal terms. Free forever." />
        <meta name="keywords" content="Law Dictionary, Legal Terms, Aqsa Zam Zam Mirza Johar Baig, Aqsa Mirza, BA LLB, CLAT AIR 42, Legal Researcher" />
        <meta name="author" content="Aqsa Zam Zam Mirza Johar Baig" />
        <link rel="canonical" href={`${BASE_URL}/`} />

        {/* Open Graph – complete set */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="LexiLaw – Legal Dictionary by Aqsa Mirza" />
        <meta property="og:description" content="Browse hundreds of legal terms explained in plain English by Aqsa Zam Zam Mirza Johar Baig. Free legal dictionary with search and bookmarks." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LexiLaw Legal Dictionary" />
        <meta property="og:locale" content="en_US" />

        {/* X (Twitter) Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aqsamirza08" />
        <meta name="twitter:creator" content="@aqsamirza08" />
        <meta name="twitter:title" content="LexiLaw – Legal Dictionary by Aqsa Mirza" />
        <meta name="twitter:description" content="Browse hundreds of legal terms explained in plain English by Aqsa Zam Zam Mirza Johar Baig. Free legal dictionary with search and bookmarks." />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">The Legal Reference You Need</p>
          <h1 className="hero__title">Law, Explained<br />in Plain English</h1>
          <p className="hero__subtitle">
            Browse hundreds of legal terms — clearly defined with real-world examples.
            Bookmark your favorites. Search instantly. Created by <strong>Aqsa Zam Zam Mirza Johar Baig</strong>, CLAT AIR 42.
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
                    <Link
                      key={t._id}
                      to={`/terms/${t.slug}`}
                      className="search-dropdown-item"
                      onClick={() => setSearchOpen(false)}
                    >
                      <span className="search-dropdown-item__term">{t.term}</span>
                      <span className="search-dropdown-item__cat badge">{t.category}</span>
                    </Link>
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
          <AlphabetNav active={null} />
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

      {/* What is LexiLaw – SEO word-count section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section__header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <h2 className="section__title">What is LexiLaw?</h2>
            <div className="section__divider" style={{ margin: 0, width: '60px' }} />
          </div>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { icon: '📖', title: 'Plain-English Definitions', desc: 'Every legal term is explained in simple, everyday language — no law degree required. Whether you are a student, professional, or curious citizen, you will understand exactly what each term means.' },
              { icon: '⚡', title: 'Instant Search', desc: 'Find any legal term in milliseconds with our real-time search engine. Type a word and instantly see matching definitions from our growing database of hundreds of legal terms.' },
              { icon: '🔖', title: 'Bookmark & Save', desc: 'Save terms you are studying or frequently reference. Your bookmarks are stored locally in your browser — no account needed, always private and instantly accessible.' },
              { icon: '🔡', title: 'A–Z Dictionary Browse', desc: 'Browse the full legal dictionary alphabetically. Jump to any letter — from Acquittal to Zero-Tolerance Policy — using our quick-access A–Z navigation bar.' },
              { icon: '⚖️', title: 'Covers All Areas of Law', desc: 'LexiLaw covers criminal law, civil law, constitutional law, contract law, tort law, property law, family law, evidence law, and more — giving you a comprehensive legal reference in one place.' },
              { icon: '🎓', title: 'Built for Students', desc: 'Created by Aqsa Zam Zam Mirza Johar Baig (CLAT AIR 42), LexiLaw is designed with law students in mind. Every definition is paired with real-world examples to help you apply the concept in exams and practice.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: '1.6rem' }}>{icon}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold-primary)', margin: 0 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Creator - SEO Optimized Section */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
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
              <strong>Aqsa Zam Zam Mirza Johar Baig</strong>, formally known online as <strong>Aqsa Mirza</strong>, is a dedicated BA LLB student at Dr. Panjabrao Deshmukh College of Law, Amravati, and the visionary behind LexiLaw. Achieving an impressive <strong>CLAT 2022 AIR 42</strong>, she combines her profound academic understanding of the law with modern web development skills to make legal knowledge accessible to everyone. As a passionate <strong>Legal Researcher</strong> and technologist, Aqsa actively bridges the gap between complex jurisprudence and plain-English comprehension, providing invaluable resources for students, professionals, and the public alike. LexiLaw is her commitment to democratizing legal education — one definition at a time.
            </p>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                Explore More by Aqsa Mirza
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-portf.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Portfolio →</a>
                <a href="https://www.linkedin.com/in/aqsa-zam-zam-mirza-johar-baig-28501b3b6/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>LinkedIn →</a>
                <a href="https://github.com/AQSA-ZAM-ZAM-MIRZA-JOHAR-BAIG" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>GitHub →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-const.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Constitutional Law →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-urdu.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Urdu Shayari →</a>
                <a href="https://aqsa-zam-zam-mirza-johar-baig-blogs.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Blogs →</a>
                <a href="https://aqsamirza08.medium.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>Medium →</a>
                <a href="https://www.youtube.com/@aqsamirza08" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>YouTube →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
