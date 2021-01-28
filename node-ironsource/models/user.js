const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 140,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    required: true,
    trim: true,
    lowercase: true
  },
  // username: {
  //   type: String,
  //   minlength: 1,
  //   maxlength: 24,
  //   pattern: /^[a-z0-9]+$/,
  //   lowercase: true,
  // },
  passwordHashAndSalt: {
    type: String
  },
  picture: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
