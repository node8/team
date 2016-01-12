'use strict';

let express = require('express'),
  router = new express.Router();



module.exports = function(app) {
  app.use('/', router);
};
