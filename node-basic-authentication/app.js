const express = require('express');
const path = require('path');
const authenticationRouter = require('./routers/authentication');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/profile', (req, res, next) => {
  res.render('profile');
});

app.use('/authentication', authenticationRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.render('error');
});

module.exports = app;
