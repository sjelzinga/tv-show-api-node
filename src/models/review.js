const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TvShow"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = Review;
