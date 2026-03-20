import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div>
            <p className="footer__brand">⚖️ LexiLaw</p>
            <p className="footer__desc">
              Your trusted reference for legal terminology. Clear, simple explanations
              of complex legal concepts for everyone.
            </p>
          </div>
          <nav className="footer__nav" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/dictionary">Dictionary</Link>
            <Link to="/bookmarks">Bookmarks</Link>
          </nav>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} LexiLaw Dictionary. For educational purposes only — not legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
