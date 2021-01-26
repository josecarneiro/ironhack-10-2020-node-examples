const express = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');

const router = new express.Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const data = req.body;
  // Lets see if there's already a user with that email in the database
  User.findOne({
    email: data.email
  })
    .then(user => {
      if (user) {
        // "Throw" error that will be caught by callback passed to catch method
        throw new Error('There is already a user with that email.');
        // return Promise.reject(
        //   new Error('There is already a user with that email.')
        // );
      } else {
        // If there isn't a user with that email in the database
        // we want to go ahead and hash the inserted password
        return bcryptjs.hash(data.password, 10);
      }
    })
    .then(passwordHashAndSalt => {
      // After having hashed the password
      // we want to go ahead and create a new user account
      return User.create({
        name: data.name,
        email: data.email,
        passwordHashAndSalt: passwordHashAndSalt
      });
    })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/log-in', (req, res, next) => {
  res.render('log-in');
});

router.post('/log-in', (req, res, next) => {
  const data = req.body;
  let user;
  User.findOne({
    email: data.email
  })
    .then(doc => {
      user = doc;
      if (user) {
        return bcryptjs.compare(data.password, user.passwordHashAndSalt);
      } else {
        throw new Error('There is no user registered with that email.');
      }
    })
    .then(result => {
      if (result) {
        req.session.userId = user._id;
        res.redirect('/profile');
      } else {
        throw new Error("The password doesn't match.");
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/log-out', (req, res, next) => {
  // req.session.userId = undefined;
  // delete req.session.userId;
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
