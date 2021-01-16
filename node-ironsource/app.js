const express = require('express');
const path = require('path');
const resourceRouter = require('./routers/resource');

const Resource = require('./models/resource');
const { nextTick } = require('process');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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

// Add a catch all error handler
app.use((error, req, res, next) => {
  console.log('There was an error somewhere within the application.');
  console.log(error);
  // if (error.status) {
  //   res.status(error.status);
  // } else {
  //   res.status(500);
  // }
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
