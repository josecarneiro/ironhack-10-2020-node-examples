const mongoose = require('mongoose');

// When using mongoose, we need to create a Schema and a Model
// for every collection we want to work with

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140
  },
  author: {
    type: String,
    required: true // Are not validators.
  },
  pages: {
    type: Number,
    min: 1,
    max: 1000
  },
  condition: {
    type: String,
    enum: ['new', 'used']
  },
  genres: [{ type: String }],
  availability: {
    type: Boolean,
    default: true // Are not validators.
  },
  isbn: {
    type: String,
    unique: true // Are not validators. Creates an index in the collection for this property.
  }
});

// The model is going to allow us to perform actions
// dealing with the actual "books" collection in the database

const BookModel = mongoose.model('Book', bookSchema); // Corresponds to the books collection

// Naming the model
// Model Name / Collection Name
// Book      -> books
// Reader    -> readers
// Person    -> persons

// CRUD
// Create
// Read
// Updating
// Deleting

mongoose
  .connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection has been established.');

    // The find (static) method takes a filter object
    // and returns a promise that resolves with an array of books
    return BookModel.find({ pages: { $gte: 100 } });
  })
  .then(books => {
    console.log('Queried the books collection for all book documents.');
    console.log(books);

    // To add a document to the database we use the create static method
    // and pass it an object representing a single document
    return BookModel.create({
      title: 'The Secret Lives of Planes',
      author: 'Paul Murdin',
      pages: 279,
      condition: 'used',
      genres: ['science'],
      availability: true
    });
  })
  .then(book => {
    console.log('Book was created');
    console.log(book);

    // To add multiple documents to the database we use the create (static) method
    // (or createMany)
    // and pass it an array of objects representing multiple documents
    return BookModel.create([
      {
        title: 'Life 3.0',
        author: 'Mag Tegmark',
        pages: 364
      },
      {
        title: 'This Idea is Brilliant',
        author: 'John Brockman',
        pages: 508
      }
    ]);
  })
  .then(() => {
    return BookModel.findById('5ffdfa5359a25814d17792c8');
  })
  .then(book => {
    console.log('Found a document in the books collection by its id.');
    // If no book exists with that id, the value of the parameter book is going to be null
    console.log(book);

    return BookModel.findOne({ title: 'This Idea is Brilliant' });
  })
  .then(book => {
    console.log('Found a document with title "This Idea is Brilliant"');
    console.log(book);

    // To update a document, I can use
    // findByIdAndUpdate -> takes id of document, and object with properties that should be updated
    // findOneAndUpdate -> takes filter object, and object with properties that should be updated
    // return BookModel.findOneAndUpdate( { title: 'Life 3.0' }, { condition: 'used', pages: 500 }, { new: true });
    return BookModel.findByIdAndUpdate(
      '5ffde3f283c10de5d2d08069',
      {
        condition: 'used',
        pages: 500
      },
      { new: true }
    );
  })
  .then(book => {
    console.log('Updated book condition to used.');
    console.log(book);

    // To update a document, I can use
    // findByIdAndDelete -> takes id of document, deletes it
    // findOneAndDelete -> takes filter object, deletes object that matches filter
    // return BookModel.findByIdAndDelete('5ffdfbd43db81317a7abb249');
    return BookModel.findOneAndDelete({ title: 'Life 3.0' });
  })
  .then(() => {
    console.log('Book was deleted');

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Connection has been destroyed.');
  })
  .catch(error => {
    console.log('There was an error somewhere in the promise chain.');
    console.log(error);
  });
