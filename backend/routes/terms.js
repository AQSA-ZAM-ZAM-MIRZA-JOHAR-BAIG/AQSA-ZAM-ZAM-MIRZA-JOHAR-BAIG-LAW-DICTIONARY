const express = require('express');
const router = express.Router();
const Term = require('../models/Term');

// GET /api/terms - All terms with optional letter filter and pagination
router.get('/', async (req, res) => {
  try {
    const { letter, page = 1, limit = 20 } = req.query;
    const query = letter ? { letter: letter.toUpperCase() } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [terms, total] = await Promise.all([
      Term.find(query)
        .sort({ term: 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('term letter category definition slug'),
      Term.countDocuments(query),
    ]);

    res.json({
      terms,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/terms/search?q= - Autocomplete search
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 1) {
      return res.json({ terms: [] });
    }

    const terms = await Term.find({
      term: { $regex: q.trim(), $options: 'i' },
    })
      .sort({ term: 1 })
      .limit(10)
      .select('term letter category slug');

    res.json({ terms });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/terms/letters - Get available letters with counts
router.get('/letters', async (req, res) => {
  try {
    const letters = await Term.aggregate([
      { $group: { _id: '$letter', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { letter: '$_id', count: 1, _id: 0 } },
    ]);
    res.json({ letters });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/terms/letter/:letter - All terms for a given letter
router.get('/letter/:letter', async (req, res) => {
  try {
    const letter = req.params.letter.toUpperCase();
    const terms = await Term.find({ letter })
      .sort({ term: 1 })
      .select('term letter category definition slug');
    res.json({ terms, letter });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/terms/slug/:slug - Get term by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const term = await Term.findOne({ slug: req.params.slug });
    if (!term) return res.status(404).json({ message: 'Term not found' });
    res.json({ term });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/terms/:id - Single term by ID
router.get('/:id', async (req, res) => {
  try {
    const term = await Term.findById(req.params.id);
    if (!term) return res.status(404).json({ message: 'Term not found' });
    res.json({ term });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
