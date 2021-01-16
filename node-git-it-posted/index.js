const express = require('express');
const path = require('path');
const Advert = require('./models/advert');
const mongoose = require('mongoose');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Make express parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  // Query the database for every advert
  Advert.find()
    .sort({ creationDate: -1 })
    .then(adverts => {
      // Render home view and pass it adverts
      res.render('home', { adverts: adverts });
    })
    .catch(error => {
      res.render('error');
    });
});

app.get('/advert/:id', (req, res) => {
  const id = req.params.id;
  Advert.findById(id)
    .then(advert => {
      res.render('single', { advert: advert });
    })
    .catch(error => {
      res.render('error');
    });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  // Get submission...
  const data = req.body;
  console.log(data);

  // Save it to the database...
  Advert.create({
    title: data.title,
    description: data.description,
    location: data.location
  })
    .then(() => {
      // Redirect the user to the homepage...
      res.redirect('/');
    })
    .catch(error => {
      res.render('error');
    });
});

app.get('*', (req, res) => {
  res.render('error');
});

mongoose
  .connect('mongodb://localhost:27017/get-it-posted', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000);
  });
