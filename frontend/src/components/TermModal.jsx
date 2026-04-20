import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import { useBookmarks } from '../hooks/useBookmarks';

export default function TermModal({ term, onClose }) {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!term) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        <div className="modal__header">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 id="modal-title" className="modal__title">{term.term}</h2>
            <span className="badge">{term.category} · {term.letter}</span>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="modal__body">
          <div>
            <p className="modal__section-label">Definition</p>
            <p className="modal__definition">{term.definition}</p>
          </div>

          {term.example && (
            <div>
              <p className="modal__section-label">Example</p>
              <blockquote className="modal__example">{term.example}</blockquote>
            </div>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <p className="modal__section-label">Related Terms</p>
              <div className="modal__related">
                {term.relatedTerms.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal__footer">
          <BookmarkButton
            termId={term._id}
            isBookmarked={isBookmarked(term._id)}
            onToggle={toggleBookmark}
          />
          <Link
            className="btn btn-outline"
            to={`/terms/${term.slug}`}
            style={{ display: 'inline-block' }}
          >
            Full Page →
          </Link>
        </div>
      </div>
    </div>
  );
}
