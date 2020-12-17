const express = require('express');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// /:foo/something
// /something/:foo
// /:foo/:bar -> /abc/def, /def/ghi
// /:foo/something/:bar -> /abc/something/def, /ghi/something/def

app.get('/:foo', (request, response) => {
  const name = request.params.foo;
  switch (name) {
    case 'jose':
      response.render('home', { message: 'Olá Mundo' });
      break;
    case 'stefano':
      response.render('home', { message: 'Ciao Mondo' });
      break;
    default:
      response.render('home', { message: `Hello World, this is ${name}` });
  }
});

app.listen(3000);
