var usersController = require('../controllers/usersController');
var eventsController = require('../controllers/eventsController');
var commentsController = require('../controllers/commentsController');
var ratingsController = require('../controllers/ratingsController');
var homeController = require('../controllers/homeController');

module.exports = {
  users: usersController,
  events: eventsController,
  comments: commentsController,
  ratings: ratingsController,
  home: homeController
};
