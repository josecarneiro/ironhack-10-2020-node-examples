const fileSystem = require('fs');

// Chain promises
fileSystem.promises
  .readFile('./b.txt', 'utf-8')
  .then((contentsB) => {
    console.log('Promise to load contents of B was resolved.');
    console.log(contentsB);
    return fileSystem.promises.readFile('./c.txt', 'utf-8');
  })
  .then((contentsC) => {
    console.log('Promise to load contents of C was resolved.');
    console.log(contentsC);
    return fileSystem.promises.readFile('./d.txt', 'utf-8');
  })
  .then((contentsD) => {
    console.log('Promise to load contents of D was resolved.');
    console.log(contentsD);
  })
  .catch((errorOfOneOfThePromisesAbove) => {
    console.log('One of the promises was rejected');
    console.log(errorOfOneOfThePromisesAbove);
  });
