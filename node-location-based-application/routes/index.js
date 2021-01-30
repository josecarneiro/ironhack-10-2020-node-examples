'use strict';

const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Hello World!' });
});

module.exports = router;
