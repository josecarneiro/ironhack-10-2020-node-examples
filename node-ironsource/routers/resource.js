const express = require('express');
const Resource = require('./../models/resource');
const routeGuardMiddleware = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const router = new express.Router();

router.get('/create', routeGuardMiddleware, (req, res, next) => {
  res.render('resource/create');
});

router.post(
  '/create',
  routeGuardMiddleware,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    const data = req.body;

    let topics;

    if (typeof data.topic === 'string') {
      topics = [data.topic];
    } else if (data.topic instanceof Array) {
      topics = data.topic;
    } else {
      topics = [];
    }

    let image;
    if (req.file) {
      image = req.file.path;
    }

    Resource.create({
      title: data.title,
      url: data.url,
      category: data.category,
      // topics: typeof data.topic === 'string' ? [ data.topic ] : Array.isArray(data.topic) ? data.topic : [],
      // ...{ topics: typeof data.topic === 'string' ? [data.topic] : data.topic },
      topics: topics,
      difficulty: data.difficulty,
      image: image,
      creator: req.user._id
      // creator: req.session.userId
    })
      .then(resource => {
        res.redirect(`/resource/${resource._id}`);
      })
      .catch(error => {
        next(error);
      });
  }
);

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Resource.findById(id)
    .then(resource => {
      if (resource === null) {
        const error = new Error('Resource does not exist.');
        error.status = 404;
        next(error);
      } else {
        res.render('resource/single', { resource: resource });
      }
    })
    .catch(error => {
      if (error.kind === 'ObjectId') {
        error.status = 404;
      }
      next(error);
    });
});

router.get('/:id/update', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  Resource.findById(id)
    .then(resource => {
      res.render('resource/update', { resource: resource });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/update', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Resource.findByIdAndUpdate(id, {
    title: data.title,
    url: data.url,
    difficulty: data.difficulty,
    image: data.image || undefined
  })
    .then(resource => {
      res.redirect(`/resource/${resource._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/delete', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  Resource.findById(id)
    .then(resource => {
      res.render('resource/confirm-deletion', { resource: resource });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  Resource.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/upvote', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  Resource.findByIdAndUpdate(id, {
    $inc: {
      points: 1
    }
  })
    .then(() => {
      res.redirect(`/#resource-${id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
