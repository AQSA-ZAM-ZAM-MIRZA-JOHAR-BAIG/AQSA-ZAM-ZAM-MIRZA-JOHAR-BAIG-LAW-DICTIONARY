import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const searchTerms = (q) =>
  API.get(`/api/terms/search?q=${encodeURIComponent(q)}`);

export const getTermsByLetter = (letter) =>
  API.get(`/api/terms/letter/${letter}`);

export const getTerms = (params = {}) =>
  API.get('/api/terms', { params });

export const getTermById = (id) =>
  API.get(`/api/terms/${id}`);

export const getTermBySlug = (slug) =>
  API.get(`/api/terms/slug/${slug}`);

export const getLetters = () =>
  API.get('/api/terms/letters');

export const getBookmarks = (ids) =>
  API.get(`/api/bookmarks?ids=${ids.join(',')}`);

export default API;
