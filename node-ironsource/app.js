const express = require('express');
const path = require('path');
const nodeSassMiddleware = require('node-sass-middleware');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(expressSession);
const mongoose = require('mongoose');

const baseRouter = require('./routers/base');
const resourceRouter = require('./routers/resource');
const authenticationRouter = require('./routers/authentication');

const app = express();
const userDeserializationMiddleware = require('./middleware/deserialize-user');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(path.join(__dirname, 'public/favicon.ico')));
app.use(
  nodeSassMiddleware({
    dest: path.join(__dirname, 'public/styles'),
    src: path.join(__dirname, 'styles'),
    force: true,
    // outputStyle: 'compressed',
    outputStyle: 'expanded',
    prefix: '/styles'
  })
);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
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
app.use(userDeserializationMiddleware);

// Mount the router
app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/resource', resourceRouter);

app.all('*', (req, res, next) => {
  const error = new Error('Page not found.');
  error.status = 404;
  next(error);
});

// Add a catch all error handler
app.use((error, req, res, next) => {
  console.log('There was an error somewhere within the application.');
  console.log(error);
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
