import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { getTermsByLetter, getTerms } from '../api/termsApi';
import AlphabetNav from '../components/AlphabetNav';
import TermCard from '../components/TermCard';

const BASE_URL = 'https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

const LETTER_DESCRIPTIONS = {
  A: 'Legal terms starting with A include Acquittal, Affidavit, Amicus Curiae, Arraignment, Assault, and Attorney-Client Privilege — essential concepts in criminal and civil law.',
  B: 'Legal terms starting with B include Bail, Battery, Bench Trial, Beyond a Reasonable Doubt, and Breach of Contract — foundational concepts every law student must know.',
  C: 'Legal terms starting with C include Causation, Certiorari, Civil Law, Class Action, Contempt of Court, Contract, and Conviction — core principles spanning multiple areas of law.',
  D: 'Legal terms starting with D include Damages, Defamation, Defendant, Deposition, Discovery, Double Jeopardy, and Due Process — critical procedural and substantive law concepts.',
  E: 'Legal terms starting with E include Easement, Eminent Domain, Equity, Evidence, and Extradition — covering property, constitutional, and procedural law.',
  F: 'Legal terms starting with F include Felony, Fiduciary, and Fraud — important terms in criminal law, trust law, and business law.',
  G: 'Legal terms starting with G include Grand Jury and Guardian Ad Litem — terms central to the criminal justice process and family law.',
  H: 'Legal terms starting with H include Habeas Corpus, Hearsay, and Homicide — fundamental concepts in constitutional rights, evidence, and criminal law.',
  I: 'Legal terms starting with I include Immunity, Indictment, Injunction, and Interrogatory — terms covering constitutional protections and civil procedure.',
  J: 'Legal terms starting with J include Judgment, Jurisdiction, and Jury — the building blocks of every court proceeding and legal decision.',
  L: 'Legal terms starting with L include Liability, Libel, and Lien — essential concepts in tort law, defamation law, and property law.',
  M: 'Legal terms starting with M include Mens Rea, Miranda Rights, Misdemeanor, and Motion — core criminal law and procedure concepts.',
  N: 'Legal terms starting with N include Negligence and Non Compos Mentis — foundational tort law and mental competency concepts.',
  O: 'Legal terms starting with O include Oath and Objection — important terms in courtroom procedure and evidence law.',
  P: 'Legal terms starting with P include Parole, Perjury, Plaintiff, Plea Bargain, Power of Attorney, Precedent, Probable Cause, Probate, and Probation — critical criminal, civil, and estate law concepts.',
  Q: 'Legal terms starting with Q include Qualified Immunity — a key constitutional law doctrine governing government official liability.',
  R: 'Legal terms starting with R include Reasonable Doubt and Restraining Order — crucial standards in criminal law and family court proceedings.',
  S: 'Legal terms starting with S include Search and Seizure, Self-Defense, Settlement, Slander, Statute, Statute of Limitations, Subpoena — covering constitutional rights, tort law, and civil procedure.',
  T: 'Legal terms starting with T include Testimony, Tort, and Trust — central concepts in evidence law, civil liability, and estate planning.',
  U: 'Legal terms starting with U include Unconscionable Contract — an important concept in contract law and consumer protection.',
  V: 'Legal terms starting with V include Venue and Verdict — key terms in determining where cases are tried and how they conclude.',
  W: 'Legal terms starting with W include Warrant, Will & Testament, and Witness — fundamental terms in criminal procedure, estate law, and evidence.',
  X: 'Legal terms starting with X include Xenophobia Law — covering anti-discrimination legislation and human rights protections.',
  Y: 'Legal terms starting with Y include Yield of Possession — a property law concept relating to the transfer of land rights.',
  Z: 'Legal terms starting with Z include Zero-Tolerance Policy — covering strict liability frameworks used in schools, workplaces, and criminal justice.',
};

export default function DictionaryPage() {
  const { letter: paramLetter } = useParams();
  const [activeLetter, setActiveLetter] = useState(paramLetter?.toUpperCase() || 'A');
  const [terms, setTerms] = useState([]);
  const [allTerms, setAllTerms] = useState({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(paramLetter ? 'letter' : 'all');

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

  const metaTitle = mode === 'letter'
    ? `Legal Terms Starting with ${activeLetter} – LexiLaw Dictionary`
    : 'Full Legal Dictionary A–Z – LexiLaw | All Legal Terms';

  const metaDesc = mode === 'letter'
    ? (LETTER_DESCRIPTIONS[activeLetter] || `Browse all legal terms starting with ${activeLetter} on LexiLaw — clear plain-English definitions with real-world examples for students and professionals.`)
    : 'Browse the complete LexiLaw legal dictionary from A to Z. Hundreds of legal terms with plain-English definitions, real-world examples, and category tags — free forever.';

  const canonicalUrl = mode === 'letter'
    ? `${BASE_URL}/dictionary/${activeLetter}`
    : `${BASE_URL}/dictionary`;

  const pageTitle = mode === 'letter'
    ? `Letter ${activeLetter} – Legal Dictionary`
    : 'Full Legal Dictionary A–Z';

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LexiLaw Legal Dictionary" />

        {/* X (Twitter) Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aqsamirza08" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold-primary)' }}>
                {pageTitle}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
                {mode === 'letter' ? `${terms.length} term${terms.length !== 1 ? 's' : ''} found` : 'All letters — browse or use search'}
              </p>
            </div>
            {mode === 'letter' && (
              <Link className="btn btn-outline" to="/dictionary" style={{ display: 'inline-block' }}>
                View All
              </Link>
            )}
          </div>
          <AlphabetNav active={activeLetter} />
        </div>
      </section>

      {/* Letter description for word count + context */}
      {mode === 'letter' && LETTER_DESCRIPTIONS[activeLetter] && (
        <section style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)', padding: '18px 0' }}>
          <div className="container">
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 800 }}>
              {LETTER_DESCRIPTIONS[activeLetter]}
            </p>
          </div>
        </section>
      )}

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

      {/* SEO word count footer for dictionary index */}
      {mode === 'all' && (
        <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '40px 0' }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold-primary)', marginBottom: 14 }}>
              About LexiLaw Legal Dictionary
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              LexiLaw is a free, comprehensive legal dictionary created by <strong>Aqsa Zam Zam Mirza Johar Baig</strong> (CLAT AIR 42),
              a BA LLB student at Dr. Panjabrao Deshmukh College of Law, Amravati. This dictionary covers hundreds of legal terms
              spanning criminal law, civil law, constitutional law, contract law, tort law, property law, evidence law, and more.
              Each term includes a plain-English definition and a real-world example to help students, legal professionals, and
              curious citizens understand how the law works. Use the A–Z navigation above to browse by letter, or use the search
              bar to find any term instantly. New terms are added regularly. LexiLaw is free to use and will always remain free.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
