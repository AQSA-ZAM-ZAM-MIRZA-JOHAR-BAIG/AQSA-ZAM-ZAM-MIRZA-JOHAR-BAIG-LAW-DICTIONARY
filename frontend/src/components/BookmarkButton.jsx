import React from 'react';

export default function BookmarkButton({ termId, isBookmarked, onToggle }) {
  return (
    <button
      className={`bookmark-btn${isBookmarked ? ' active' : ''}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(termId); }}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={isBookmarked ? 'Remove from bookmarks' : 'Save to bookmarks'}
    >
      {isBookmarked ? '🔖' : '📄'}
    </button>
  );
}
