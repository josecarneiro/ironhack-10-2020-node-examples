const express = require('express');
const path = require('path');
const nodeSassMiddleware = require('node-sass-middleware');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');

const resourceRouter = require('./routers/resource');
const Resource = require('./models/resource');

const app = express();

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

app.get('/', (req, res) => {
  Resource.find()
    .then(resources => {
      res.render('home', { resources });
    })
    .catch(error => {
      next(error);
    });
});

// Mount the router
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
