import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLetters } from '../api/termsApi';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphabetNav({ active, onSelect }) {
  const [available, setAvailable] = useState(new Set());

  useEffect(() => {
    getLetters()
      .then(({ data }) => {
        const set = new Set(data.letters.map((l) => l.letter));
        setAvailable(set);
      })
      .catch(() => setAvailable(new Set(ALPHABET)));
  }, []);

  return (
    <nav className="az-nav" aria-label="Browse by letter">
      {ALPHABET.map((letter) => {
        const disabled = available.size > 0 && !available.has(letter);
        return (
          <Link
            key={letter}
            to={`/dictionary/${letter}`}
            className={`az-nav__btn${active === letter ? ' active' : ''}${disabled ? ' disabled' : ''}`}
            onClick={onSelect ? (e) => { e.preventDefault(); if (!disabled) onSelect(letter); } : undefined}
            aria-label={`Browse terms starting with ${letter}`}
            aria-current={active === letter ? 'true' : undefined}
            aria-disabled={disabled ? 'true' : undefined}
          >
            {letter}
          </Link>
        );
      })}
    </nav>
  );
}
