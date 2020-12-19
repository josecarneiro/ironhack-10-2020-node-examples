const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const axios = require('axios');

// NOTE
// To have this environment variable available to you
// You need to include a .env file in the project with
// OMDB_API_KEY=YOUR_KEY_RIGHT_HERE
// You can get an API key from http://www.omdbapi.com

const omdbApiKey = process.env.OMDB_API_KEY;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/search', (request, response) => {
  const searchQuery = request.query.q;
  const apiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchQuery}`;
  axios
    .get(apiUrl)
    .then(result => {
      const data = result.data;
      const movies = data.Search;
      response.render('results', {
        searchQuery: searchQuery,
        movies: movies
      });
    })
    .catch(error => {
      response.render('error');
    });
});

app.get('/movie/:id', (request, response) => {
  const id = request.params.id;
  const apiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${id}`;
  axios
    .get(apiUrl)
    .then(result => {
      const data = result.data;
      const movie = data;
      response.render('movie', { movie });
    })
    .catch(error => {
      response.render('error');
    });
});

app.get('*', (request, response) => {
  response.render('error');
});

app.listen(3000);
