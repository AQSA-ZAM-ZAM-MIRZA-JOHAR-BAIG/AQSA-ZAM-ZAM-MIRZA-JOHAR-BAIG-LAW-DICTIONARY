const express = require('express');
const router = express.Router();
const Term = require('../models/Term');

// GET /api/bookmarks?ids=id1,id2,id3
// Fetches full term data for an array of saved term IDs
router.get('/', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.json({ terms: [] });

    const idArray = ids.split(',').filter(Boolean);
    if (idArray.length === 0) return res.json({ terms: [] });

    const terms = await Term.find({ _id: { $in: idArray } }).sort({ term: 1 });
    res.json({ terms });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
