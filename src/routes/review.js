const express = require('express');
const Review = require('../models/review');
const auth = require('../middleware/auth');
const router = new express.Router();

const helperFunctions = require('../helper/helperFunctions');

router.post('/reviews', auth, async (req, res) => {
  const review = new Review({
    ...req.body,
    username: req.user.username,
    user: req.user._id,
  });

  try {
    await review.save();
    res.status(201).send(review);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.send(reviews);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/reviews/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      res.status(404).send();
    }

    res.send(review);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
