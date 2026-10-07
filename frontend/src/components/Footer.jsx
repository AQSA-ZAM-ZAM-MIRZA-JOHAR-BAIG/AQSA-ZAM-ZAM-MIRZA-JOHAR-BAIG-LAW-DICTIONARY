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
        {/* Entity Verified Network Directory */}
        <div style={{ margin: '24px 0 16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Official Verified Web Network of Aqsa Zam Zam Mirza Johar Baig (Aqsa Mirza)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 10px', fontSize: '11px' }}>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-portf.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Zam Zam Mirza Johar Baig – AI Developer Portfolio</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-blogs.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Mirza – AI &amp; Engineering Blogs</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-const.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Zam Zam Mirza – Constitutional Law Research</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-law-d.vercel.app/" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Mirza – LexiLaw Legal Dictionary</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-law-f.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Zam Zam Mirza Johar Baig – Law For Beginners</a>
            <a href="https://aqsazamzammirzajoharbaig.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Zam Zam Mirza – Alerto Market Bot</a>
            <a href="https://firgenerator.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Mirza – FIR Generator Online</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-urdu.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>AQSA ZAM ZAM MIRZA JOHAR BAIG – Urdu Shayari</a>
            <a href="https://www.aqsazamzammirzajoharbaig.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Zam Zam Mirza Johar Baig – Drawing Center Studio</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig-portfolio-3.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Mirza – VIP Logistics &amp; Executive Services</a>
            <a href="https://aqsa-zam-zam-mirza-johar-baig.github.io/Yashwantrao-chavan-mahavidyalaya/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}>Aqsa Zam Zam Mirza Johar Baig – Academic Merit Records</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} LexiLaw Dictionary | Created by <strong>Aqsa Zam Zam Mirza Johar Baig (Aqsa Mirza)</strong>. 
            <br />
            For educational purposes only — not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
