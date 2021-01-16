const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  creationDate: {
    type: Date,
    default: Date.now
  }
});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
