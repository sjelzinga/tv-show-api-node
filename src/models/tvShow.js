const mongoose = require("mongoose");

const tvShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  released: {
    type: String,
    trim: true
  },
  runtime: {
    type: String,
    trim: true
  },
  rated: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  plot: {
    type: String,
    trim: true
  },
  langauge: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  awards: {
    type: String,
    trim: true
  },
  poster: {
    type: String,
    required: true,
    trim: true
  },
  ratings: [
    { reviewId: { type: mongoose.Schema.Types.ObjectId }, rating: Number }
  ]
});

const TvShow = mongoose.model("TvShow", tvShowSchema);

module.exports = TvShow;
