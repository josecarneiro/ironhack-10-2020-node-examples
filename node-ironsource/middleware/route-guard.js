'use strict';

const routeGuard = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // next(new Error('Authentication required.'));
    res.redirect('/authentication/log-in');
  }
};

module.exports = routeGuard;
