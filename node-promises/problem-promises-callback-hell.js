const fileSystem = require('fs');

// Easier way to write what we have above
fileSystem.promises
  .readFile('./b.txt', 'utf-8')
  .then((contentsB) => {
    console.log('Promise to load contents of B was resolved.');
    console.log(contentsB);
    fileSystem.promises
      .readFile('./c.txt', 'utf-8')
      .then((contentsC) => {
        console.log('Promise to load contents of B was resolved.');
        console.log(contentsC);
      })
      .catch((errorC) => {
        console.log('Promise reject');
        console.log(errorC);
      });
  })
  .catch((errorB) => {
    console.log('Promise reject');
    console.log(errorB);
  });
