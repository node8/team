'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers');

router.get('/all', controllers.comments.getAll);

//POST events/{eventID}/comments - Creates a new comment for a given event
router.post('/', controllers.comments.postComment);


module.exports = function(app) {
  app.use('/comments', router);
};
