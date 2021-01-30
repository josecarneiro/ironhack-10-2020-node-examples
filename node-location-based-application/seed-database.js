'use strict';

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const Restaurant = require('./models/restaurant');

const addRestaurantsToDatabase = (quantity) => {
  const restaurants = [];
  for (let i = 0; i < quantity; i++) {
    const latitude = 38.5 + (0.5 - Math.random()) * 5;
    const longitude = -9.5 + (0.5 - Math.random()) * 5;
    const name = [...new Array(Math.ceil(Math.random() * 10))]
      .map(() => String.fromCharCode(64 + Math.random() * 26))
      .join('');
    restaurants.push({
      name,
      location: {
        coordinates: [longitude, latitude]
      }
    });
  }
  Restaurant.create(restaurants)
    .then(() => {
      console.log('Restaurants were created');
    })
    .catch((error) => {
      console.log('Failed at creating restaurants');
    });
};

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    addRestaurantsToDatabase(1000);
  })
  .catch((error) => {
    console.error(
      `There was an error connecting the database to URI "${MONGODB_URI}"`
    );
    console.log(error);
    process.exit(1);
  });
