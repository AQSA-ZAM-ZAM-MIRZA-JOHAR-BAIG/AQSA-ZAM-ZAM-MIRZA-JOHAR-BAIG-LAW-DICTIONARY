import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import { useBookmarks } from '../hooks/useBookmarks';

export default function TermCard({ term, style }) {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <article
      className="term-card fade-up"
      style={style}
      onClick={() => navigate(`/terms/${term.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/terms/${term.slug}`)}
      aria-label={`View definition of ${term.term}`}
    >
      <div className="term-card__header">
        <h3 className="term-card__name">{term.term}</h3>
        <BookmarkButton
          termId={term._id}
          isBookmarked={isBookmarked(term._id)}
          onToggle={toggleBookmark}
        />
      </div>
      <span className="badge">{term.category}</span>
      <p className="term-card__definition">{term.definition}</p>
    </article>
  );
}
