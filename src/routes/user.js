const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const TvShow = require('../models/tvShow');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'password', 'shows'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.put('/users/me/addshow', auth, async (req, res) => {
  try {
    req.user.shows.push(req.body.id);
    await req.user.save();
    const tvshow = await TvShow.findById(req.body.id);
    res.send(tvshow);
  } catch (e) {
    res.status(400).send();
  }
});

// Get users Shows
router.get('/users/me/shows', auth, async (req, res) => {
  console.log('inside the backend call');
  console.log(req.user);
  try {
    const shows = await Promise.all(
      req.user.shows.map((showId) => TvShow.findById(showId))
    );
    res.send(shows);
  } catch (e) {
    res.status(400).send();
  }
});

//Get users ShowId
router.get('/users/me/showids', auth, async (req, res) => {
  console.log('inside the backend call');
  console.log(req.user.shows);
  try {
    res.send(req.user.shows);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete('/users/me/allshows', auth, (req, res) => {
  try {
    req.user.shows = [];
    req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete('/users/me/shows/:id', auth, async (req, res) => {
  try {
    const shows = req.user.shows.filter((showsId) => showsId != req.params.id);
    req.user.shows = shows;
    req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
