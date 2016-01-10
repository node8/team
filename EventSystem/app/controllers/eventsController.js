var Event = require('mongoose').model('Event');

module.exports = {
  getAllEvents: function(req, res, next) {
    Event.find(function (err, events) {
      if (err) {
        return next(err);
      }
      res.render('events/event', {
        title: 'Events list',
        events: events
      });
    });
  }
};
