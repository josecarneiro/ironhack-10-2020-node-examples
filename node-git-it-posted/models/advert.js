const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String
});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
