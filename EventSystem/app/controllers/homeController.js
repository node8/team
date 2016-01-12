var Event = require('mongoose').model('Event');
'use strict'

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

module.exports = {
  get10NewestEvents: function(req, res) {
    var page = req.query.page || DEFAULT_PAGE;
    var size = req.query.size || DEFAULT_SIZE;

    Event.find({})
      .skip((page - 1) * size)
      .limit(size)
      .exec(function(err, events) {
        if (err) {
          // res.redirect('error')
          throw err;
        }

        Event.count({})
          .exec(function(err, count) {
            res.render('events/list-events', {
              events: events,
              pages: (count / size) | 0 + 1,
              page: page
            });
          });
      });
  },
  getTop10MostCommentedEvents: function(req, res) {
    var page = req.query.page || DEFAULT_PAGE;
    var size = req.query.size || DEFAULT_SIZE;

    Event.find({})
      .skip((page - 1) * size)
      .limit(size)
      .exec(function(err, events) {
        if (err) {
          // res.redirect('error')
          throw err;
        }

        Event.count({})
          .exec(function(err, count) {
            res.render('events/list-events', {
              events: events,
              pages: (count / size) | 0 + 1,
              page: page
            });
          });
      });
  }
};
