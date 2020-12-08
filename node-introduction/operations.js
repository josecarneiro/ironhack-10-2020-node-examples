function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

// module.exports won't do the job,
// since we want to export multiple things
// module.exports = divide;
// module.exports = multiply;

// Possible solution
// module.exports = {
//   divide: divide,
//   multiply: multiply
// };

/*
module.exports = {
  divide,
  multiply
};
*/

// Export multiple values from a file
exports.divide = divide;
exports.multiply = multiply;
