const User = require('./../models/user');

// Deserializing the user
const userDeserializationMiddleware = (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then(user => {
        req.user = user;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        next(error);
      });
  } else {
    next();
  }
};

module.exports = userDeserializationMiddleware;
