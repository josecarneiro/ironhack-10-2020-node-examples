const express = require('express');
const Resource = require('./../models/resource');

const router = new express.Router();

router.get('/', (req, res) => {
  Resource.find()
    .then(resources => {
      res.render('home', { resources });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile', (req, res, next) => {
  if (req.user) {
    res.render('profile');
  } else {
    next(new Error('User is not authenticated.'));
  }
});

module.exports = router;
