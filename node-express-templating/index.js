const express = require('express');

const app = express();

// Prerequisites to be able to use handlebars templates
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
  // Rendering the handlebars template with name "home"
  response.render('home', { message: 'Ciao Mondo' });
});

app.listen(3000);
