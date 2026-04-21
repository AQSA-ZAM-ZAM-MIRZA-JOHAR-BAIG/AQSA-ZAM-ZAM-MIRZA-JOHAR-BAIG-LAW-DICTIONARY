import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';

export default function Navbar() {
  const navigate = useNavigate();
  const { query, setQuery, results, loading } = useSearch(250);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⚖️</span>
          <span>LexiLaw</span>
        </NavLink>

        <div className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/dictionary" className={({ isActive }) => isActive ? 'active' : ''}>Dictionary</NavLink>
          <NavLink to="/bookmarks" className={({ isActive }) => isActive ? 'active' : ''}>Bookmarks</NavLink>
        </div>

        <div className="navbar__search" ref={wrapRef}>
          <form onSubmit={handleSubmit} className="search-wrap">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                id="navbar-search"
                className="search-input"
                type="text"
                placeholder="Search legal terms…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                onFocus={() => query && setOpen(true)}
                autoComplete="off"
                aria-label="Search legal terms"
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => { setQuery(''); setOpen(false); }}
                  aria-label="Clear search"
                >×</button>
              )}
            </div>

            {open && query && (
              <div className="search-dropdown" role="listbox">
                {loading && <div className="search-dropdown-empty">Searching…</div>}
                {!loading && results.length === 0 && (
                  <div className="search-dropdown-empty">No terms found for "{query}"</div>
                )}
                {!loading && results.map((t) => (
                  <Link
                    key={t._id}
                    to={`/terms/${t.slug}`}
                    className="search-dropdown-item"
                    onClick={() => { setQuery(''); setOpen(false); }}
                    role="option"
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
    </nav>
  );
}
