const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/profile', (req, res, next) => {
  if (req.user) {
    res.render('profile');
  } else {
    next(new Error('User is not authenticated.'));
  }
});

module.exports = router;
