const mongoose = require("mongoose");

const Rating = mongoose.model("Rating", {
  rating: {
    type: Number,
    required: true
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TvShow"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = Rating;
