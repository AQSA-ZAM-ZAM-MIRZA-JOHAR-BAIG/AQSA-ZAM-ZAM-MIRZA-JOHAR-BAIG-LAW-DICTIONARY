import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTermsByLetter, getTerms } from '../api/termsApi';
import AlphabetNav from '../components/AlphabetNav';
import TermCard from '../components/TermCard';
import TermModal from '../components/TermModal';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function DictionaryPage() {
  const { letter: paramLetter } = useParams();
  const navigate = useNavigate();
  const [activeLetter, setActiveLetter] = useState(paramLetter?.toUpperCase() || 'A');
  const [terms, setTerms] = useState([]);
  const [allTerms, setAllTerms] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [mode, setMode] = useState(paramLetter ? 'letter' : 'all');

  // Letter mode: fetch by letter
  const fetchByLetter = useCallback(async (letter) => {
    setLoading(true);
    try {
      const { data } = await getTermsByLetter(letter);
      setTerms(data.terms || []);
    } catch {
      setTerms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // All mode: fetch all grouped
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getTerms({ limit: 200 });
      const grouped = {};
      (data.terms || []).forEach((t) => {
        if (!grouped[t.letter]) grouped[t.letter] = [];
        grouped[t.letter].push(t);
      });
      setAllTerms(grouped);
    } catch {
      setAllTerms({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (paramLetter) {
      setMode('letter');
      setActiveLetter(paramLetter.toUpperCase());
      fetchByLetter(paramLetter.toUpperCase());
    } else {
      setMode('all');
      fetchAll();
    }
  }, [paramLetter, fetchByLetter, fetchAll]);

  const handleLetterSelect = (letter) => {
    setActiveLetter(letter);
    navigate(`/dictionary/${letter}`);
  };

  const metaTitle = mode === 'letter'
    ? `Legal Terms Starting with ${activeLetter} – LexiLaw Dictionary`
    : 'Full Legal Dictionary A–Z – LexiLaw';

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={`Browse legal terms ${mode === 'letter' ? `starting with ${activeLetter}` : 'from A to Z'} — clear definitions and real-world examples on LexiLaw.`} />
        <link rel="canonical" href={`https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app/dictionary${mode === 'letter' ? `/${activeLetter}` : ''}`} />
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold-primary)' }}>
                {mode === 'letter' ? `Letter ${activeLetter}` : 'Full Dictionary'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
                {mode === 'letter' ? `${terms.length} term${terms.length !== 1 ? 's' : ''}` : 'All letters'}
              </p>
            </div>
            {mode === 'letter' && (
              <Link
                className="btn btn-outline"
                to="/dictionary"
                style={{ display: 'inline-block' }}
              >
                View All
              </Link>
            )}
          </div>
          <AlphabetNav active={activeLetter} onSelect={handleLetterSelect} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner" />
          ) : mode === 'letter' ? (
            terms.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state__icon">📚</span>
                <p className="empty-state__title">No terms found for "{activeLetter}"</p>
                <p className="empty-state__sub">Try a different letter from the navigation above.</p>
              </div>
            ) : (
              <div className="term-grid">
                {terms.map((term, i) => (
                  <TermCard
                    key={term._id}
                    term={term}
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setSelectedTerm(term)}
                  />
                ))}
              </div>
            )
          ) : (
            <>
              {Object.keys(allTerms).sort().map((letter) => (
                <div key={letter}>
                  <h2 className="letter-heading">{letter}</h2>
                  <div className="term-grid">
                    {allTerms[letter].map((term, i) => (
                      <TermCard
                        key={term._id}
                        term={term}
                        style={{ animationDelay: `${i * 0.04}s` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {selectedTerm && (
        <TermModal term={selectedTerm} onClose={() => setSelectedTerm(null)} />
      )}
    </>
  );
}
