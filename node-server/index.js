const http = require('http');

const server = http.createServer(function (request, response) {
  switch (request.url) {
    case '/jose':
      response.write('Ola Mundo');
      break;
    case '/stefano':
      response.write('Ciao Mondo');
      break;
    default:
      response.write('Hello World');
  }

  response.end();
});

// We usually use ports 3000-3999, 5000-5999, 8000-8999
server.listen(3020);
