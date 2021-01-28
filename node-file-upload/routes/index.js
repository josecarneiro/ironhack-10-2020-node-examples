'use strict';

const express = require('express');
const router = new express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const uploadMiddleware = multer({
  storage
  // limits: {
  //   fileSize: 588782
  // }
});

// This solution would only upload the files to the server,
// not to cloudinary
// const uploadMiddleware = multer({ dest: 'uploads' });

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Hello World!' });
});

router.post(
  '/upload-file',
  uploadMiddleware.single('content'),
  (req, res, next) => {
    res.render('success', {});
  }
);

module.exports = router;
