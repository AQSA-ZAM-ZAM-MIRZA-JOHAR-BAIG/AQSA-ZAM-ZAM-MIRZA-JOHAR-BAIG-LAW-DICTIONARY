import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="empty-state section">
      <Helmet>
        <title>Page Not Found | LexiLaw Dictionary</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <span className="empty-state__icon">🔍</span>
      <h1 className="empty-state__title">404 - Page Not Found</h1>
      <p className="empty-state__sub">The page you are looking for does not exist or has been moved.</p>
      <Link className="btn btn-gold" style={{ marginTop: 16, display: 'inline-block' }} to="/">
        Return Home
      </Link>
    </div>
  );
}
