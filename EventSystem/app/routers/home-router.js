'use strict';

let express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.home.get10NewestEventsAnd10MostCommentedEvents);
module.exports = function(app) {
  app.use('/home', router);
};
