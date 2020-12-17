const fileSystem = require('fs');

fileSystem.readFile('./a.txt', 'utf-8', (errorA, a) => {
  // console.log(errorA);
  console.log(a);
  fileSystem.readFile('./e.txt', 'utf-8', (errorB, b) => {
    // console.log(errorB);
    console.log(b);
    fileSystem.readFile('./c.txt', 'utf-8', (errorC, c) => {
      console.log(c);
      fileSystem.readFile('./d.txt', 'utf-8', (errorD, d) => {
        console.log(d);
      });
    });
  });
});

console.log('Hello world');
