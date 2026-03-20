import React, { useEffect, useState } from 'react';
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
      {ALPHABET.map((letter) => (
        <button
          key={letter}
          className={`az-nav__btn${active === letter ? ' active' : ''}`}
          onClick={() => onSelect(letter)}
          disabled={available.size > 0 && !available.has(letter)}
          aria-label={`Browse terms starting with ${letter}`}
          aria-current={active === letter ? 'true' : undefined}
        >
          {letter}
        </button>
      ))}
    </nav>
  );
}
