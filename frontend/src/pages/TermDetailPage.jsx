import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTermBySlug } from '../api/termsApi';
import BookmarkButton from '../components/BookmarkButton';
import { useBookmarks } from '../hooks/useBookmarks';

export default function TermDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [termsBySlug, setTermsBySlug] = useState({});
  const [errorBySlug, setErrorBySlug] = useState({});

  useEffect(() => {
    // Redirect if slug ends with -, ., \, or %20
    if (slug && /[-.\s%20\\]+$/.test(slug)) {
      const cleanSlug = slug.replace(/[-.\s%20\\]+$/, '');
      navigate(`/terms/${cleanSlug}`, { replace: true });
      return;
    }

    if (!slug || termsBySlug[slug] !== undefined || errorBySlug[slug]) return;

    let cancelled = false;
    getTermBySlug(slug)
      .then(({ data }) => {
        if (!cancelled) {
          setTermsBySlug((prev) => ({ ...prev, [slug]: data.term || null }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setErrorBySlug((prev) => ({ ...prev, [slug]: true }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [errorBySlug, slug, termsBySlug]);

  const term = slug ? (termsBySlug[slug] ?? null) : null;
  const loading = Boolean(slug) && termsBySlug[slug] === undefined && !errorBySlug[slug];
  const error = Boolean(errorBySlug[slug]);

  if (loading) return <div className="spinner" style={{ marginTop: 80 }} />;

  if (error || !term) {
    return (
      <div className="empty-state section">
        <Helmet>
          <title>Term Not Found | LexiLaw Dictionary</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <span className="empty-state__icon">⚖️</span>
        <h1 className="empty-state__title">Term not found</h1>
        <p className="empty-state__sub">The legal term you're looking for doesn't exist.</p>
        <Link className="btn btn-gold" style={{ marginTop: 16, display: 'inline-block' }} to="/dictionary">
          Browse Dictionary
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{term.term} – Legal Definition | LexiLaw Dictionary</title>
        <meta name="description" content={`${term.term}: ${term.definition.slice(0, 155)}…`} />
        <meta property="og:title" content={`${term.term} – Legal Definition`} />
        <meta property="og:description" content={term.definition.slice(0, 200)} />
        <link rel="canonical" href={`https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app/terms/${term.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: term.term,
          description: term.definition,
          inDefinedTermSet: 'LexiLaw Legal Dictionary',
        })}</script>
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <button
            className="btn btn-outline"
            style={{ marginBottom: 20, fontSize: '0.8rem', padding: '6px 14px' }}
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--gold-primary)', marginBottom: 12, lineHeight: 1.2 }}>
                {term.term}
              </h1>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge">{term.category}</span>
                <span className="badge">{term.letter}</span>
              </div>
            </div>
            <BookmarkButton
              termId={term._id}
              isBookmarked={isBookmarked(term._id)}
              onToggle={toggleBookmark}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            <div>
              <p className="modal__section-label">Definition</p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
                {term.definition}
              </p>
            </div>

            {term.example && (
              <div>
                <p className="modal__section-label">Example</p>
                <blockquote className="modal__example" style={{ fontSize: '1rem' }}>
                  {term.example}
                </blockquote>
              </div>
            )}

            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div>
                <p className="modal__section-label">Related Terms</p>
                <div className="modal__related">
                  {term.relatedTerms.map((t) => (
                    <span key={t} className="badge" style={{ cursor: 'default' }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn btn-gold" to={`/dictionary/${term.letter}`} style={{ display: 'inline-block' }}>
                More {term.letter} Terms
              </Link>
              <Link className="btn btn-outline" to="/dictionary" style={{ display: 'inline-block' }}>
                Browse All Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
