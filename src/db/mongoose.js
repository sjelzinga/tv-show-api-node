const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tv-show-rating-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
