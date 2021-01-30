'use strict';

const express = require('express');
const router = new express.Router();
const Restaurant = require('./../models/restaurant');

router.get('/create', (req, res, next) => {
  res.render('restaurant/new');
});

router.post('/create', (req, res, next) => {
  const data = req.body;
  Restaurant.create({
    name: data.name,
    location: {
      coordinates: [data.longitude, data.latitude]
    }
  })
    .then((restaurant) => {
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

const PERIMETER_OF_EARTH_IN_METERS = 40000 * 1000;
const PERIMETER_OF_EARTH_IN_DEGREES = 360;

const metersToDegrees = (meters) =>
  (meters * PERIMETER_OF_EARTH_IN_DEGREES) / PERIMETER_OF_EARTH_IN_METERS;

router.get('/search', (req, res, next) => {
  const { latitude, longitude, distance } = req.query;
  const radius = metersToDegrees(distance);
  Restaurant.find()
    .where('location')
    .within()
    .circle({
      center: [longitude, latitude],
      radius,
      unique: true
    })
    .then((restaurants) => {
      res.render('restaurant/results', { restaurants });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then((restaurant) => {
      res.render('restaurant/single', { restaurant });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
