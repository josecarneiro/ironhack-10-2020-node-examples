const express = require('express');

const app = express();

// Making files in "public" directory available to the browser
app.use(express.static('public'));

app.get('/jose', function (request, response) {
  response.sendFile(__dirname + '/views/jose.html');
});

app.get('/stefano', function (request, response) {
  response.sendFile(__dirname + '/views/stefano.html');
});

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/views/default.html');
});

app.listen(3000);
