const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(expressSession);
const mongoose = require('mongoose');
const User = require('./models/user');

const baseRouter = require('./routers/base');
const authenticationRouter = require('./routers/authentication');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    // Cookie related options
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    },
    // Database related options
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);

app.use(express.urlencoded({ extended: true }));

// Deserializing the user
const userDeserializationMiddleware = (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then(user => {
        req.user = user;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        next(error);
      });
  } else {
    next();
  }
};
app.use(userDeserializationMiddleware);

// const bindUserToResponseLocals = (req, res, next) => {
//   if (req.user) res.locals.user = req.user;
//   next();
// }
// app.use(bindUserToResponseLocals);

app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);

app.use((req, res, next) => {
  next(new Error('Page not found'));
});

app.use((error, req, res, next) => {
  console.log(error);
  res.render('error');
});

module.exports = app;
