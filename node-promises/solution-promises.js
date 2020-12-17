const fileSystem = require('fs');

// This returns a promise
const promiseA = fileSystem.promises.readFile('./a.txt', 'utf-8');

// All promises have the following methods
// .then(callbackForSuccess)
// .catch(callbackForError)
// .finally(callbackThatRunsAfterEverythingElse)

// Here, we're saying that, when the promise is resolved,
// then we should run the callback being passed to the then method
promiseA.then((contentsA) => {
  console.log('Promise to load contents of a was resolved.');
  console.log(contentsA);
});

promiseA.catch((errorA) => {
  console.log('Promise reject');
  console.log(errorA);
});
