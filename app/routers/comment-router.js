'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth');

router.get('/all', auth.isAuthenticated, controllers.comments.getAll);
router.post('/', auth.isAuthenticated, controllers.comments.postComment);


module.exports = function(app) {
  app.use('/comments', router);
};
