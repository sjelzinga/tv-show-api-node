const express = require('express');
const Rating = require('../models/rating');
const auth = require('../middleware/auth');
const router = new express.Router();
const helperFunctions = require('../helper/helperFunctions');

router.post('/rating', auth, async (req, res) => {
  const rating = new Rating({
    ...req.body,
    userId: req.user._id,
  });

  try {
    await rating.save();
    res.status(201).send(rating);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET Avarage TV Show Rating
router.get('/rating/tvshow/:id', async (req, res) => {
  tvShowId = req.params.id;

  try {
    const ratings = await Rating.find({ showId: tvShowId });
    const tvShowTotalRating = helperFunctions.calculateRating(ratings);
    res.send({ tvShowTotalRating });
  } catch (e) {
    res.sendStatus(500).send();
  }
});

module.exports = router;
