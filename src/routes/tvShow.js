const express = require('express');
const TvShow = require('../models/tvShow');
const Review = require('../models/review');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/shows', async (req, res) => {
  const tvShow = new TvShow(req.body);
  try {
    await tvShow.save();
    res.status(201).send(tvShow);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/shows', async (req, res) => {
  try {
    const tvShows = await TvShow.find({});
    res.send(tvShows);
  } catch (e) {
    res.status(500).send();
  }
});

//Get genres
router.get('/shows/genres', async (req, res) => {
  try {
    const tvShows = await TvShow.find({});
    let genres = tvShows.map((tvshow) => tvshow.genre.split(','));

    let test = genres.reduce(
      flatten,
      (elm) => {
        return [...flatten, ...elm];
      },
      []
    );
    res.send(genres);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/shows/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const show = await TvShow.findById(_id);

    if (!show) {
      return res.status(404).send();
    }

    res.send(show);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/shows/:id/reviews', async (req, res) => {
  const _id = req.params.id;

  try {
    const reviews = await Review.find({ showId: _id });
    res.send(reviews);
  } catch (e) {
    res.status(500).send();
  }
});

router.put('/shows/:id/review', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const tvshow = await TvShow.findOne({ _id });

    if (!tvshow) {
      return res.status(404).send();
    }

    tvshow.ratings.push(req.body);
    await tvshow.save();
    res.send(tvshow);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/shows/:id/reviews', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const tvshow = await TvShow.findOne({ _id });

    if (!tvshow) {
      return res.status(404).send();
    }
    tvshow.ratings = [];
    await tvshow.save();

    res.send(tvshow);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/shows/:id/review', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const tvshow = await TvShow.findOne({ _id });

    if (!tvshow) {
      return res.status(404).send();
    }

    const filterReviews = tvshow.ratings.filter(
      (rating) => rating.reviewId != req.body.reviewId
    );
    console.log(filterReviews);
    tvshow.ratings = filterReviews;
    await tvshow.save();
    console.log(tvshow.reviews);
    res.send(tvshow);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
