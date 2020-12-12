const express = require('express');
const hbs = require('hbs');

// To be able to use partials in my handlebars templates,
// I need to tell the hbs engine where it can look for them
hbs.registerPartials(__dirname + '/views/partials');

const app = express();

// Prerequisites to be able to use handlebars templates

// Express needs to know which package to use to render view templates
// whenever response.render(...) is called
app.set('view engine', 'hbs');

// We are telling the express app where to look for "view" files
// whenever response.render(...) is called
app.set('views', __dirname + '/views');

// app.locals is an object of properties that are
// made available to every single template that is rendered
app.locals.pageTitle = 'Random Page';

// Use express.static middleware to make contents of public folder available publicly
app.use(express.static('public'));

app.get('/', (request, response) => {
  // Rendering the handlebars template with name "home"
  response.render('home', {
    message: 'Ciao Mondo',
    pageTitle: 'Home'
    // layout: 'alternative-layout'
  });
});

app.get('/jose', (request, response) => {
  response.render('profile', {
    // pageTitle: "José's Profile",
    name: 'José',
    nationality: 'Portuguese',
    location: {
      neighbourhood: 'Chiado',
      city: 'Lisbon',
      country: 'Portugal'
    },
    pets: [
      { name: 'Whiskers', species: 'cat', isWellBehaved: false },
      { name: 'Panda', species: 'dog', isWellBehaved: true },
      { name: 'Leão', species: 'dog', isWellBehaved: false },
      { name: 'Chico', species: 'cat', isWellBehaved: true }
    ],
    favoriteBeverages: ['Cold Brew Coffee', 'Iced Tea', 'Sparkling Water']
  });
});

app.listen(3000);
