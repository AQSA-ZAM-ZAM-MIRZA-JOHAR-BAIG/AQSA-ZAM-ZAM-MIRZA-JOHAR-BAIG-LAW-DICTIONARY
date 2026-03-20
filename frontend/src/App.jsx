import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DictionaryPage from './pages/DictionaryPage';
import TermDetailPage from './pages/TermDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import SearchResultsPage from './pages/SearchResultsPage';
import './index.css';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="page-layout">
          <Navbar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dictionary" element={<DictionaryPage />} />
              <Route path="/dictionary/:letter" element={<DictionaryPage />} />
              <Route path="/terms/:slug" element={<TermDetailPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
