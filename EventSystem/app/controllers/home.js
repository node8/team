var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Event.find(function (err, events) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      events: events
    });
  });
});
