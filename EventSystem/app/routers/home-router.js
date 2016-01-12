'use strict';

let express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.home.get10NewestEvents);
router.get('/', controllers.home.getTop10MostCommentedEvents);
module.exports = function(app) {
  app.use('/home', router);
};
