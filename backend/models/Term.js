const mongoose = require('mongoose');

const termSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    letter: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    definition: {
      type: String,
      required: true,
    },
    example: {
      type: String,
      default: '',
    },
    relatedTerms: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from term before saving
termSchema.pre('save', function (next) {
  if (this.isModified('term')) {
    this.slug = this.term
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    this.letter = this.term.charAt(0).toUpperCase();
  }
  next();
});

// Text index for full-text search
termSchema.index({ term: 'text', definition: 'text' });

module.exports = mongoose.model('Term', termSchema);
