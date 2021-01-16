const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(() => {
    console.log('Unable to connect to the database.');
  });
