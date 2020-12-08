// Import single value exported from other file
const subtract = require('./subtract.js');
const operations = require('./operations.js');
// const multiply = require('./operations.js').multiply;
// const { multiply } = require('./operations.js');
const multiply = operations.multiply;
// const { multiply } = operations;

function sum(a, b) {
  return a + b;
}

const c = sum(10, 15);
const d = subtract(20, 5);

const f = operations.divide(10, 3);
const e = multiply(10, 3);

// console.log(d);
// console.log(f);

const fileSystem = require('fs');

const contents = fileSystem.readFileSync('book.txt', 'utf-8');

console.log(contents);
