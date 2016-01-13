var Event = require('mongoose').model('Event');
'use strict'

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

module.exports = {
  get10NewestEventsAnd10MostCommentedEvents: function(req, res) {
    var data = {};
    var page = req.query.page || DEFAULT_PAGE;
    var size = req.query.size || DEFAULT_SIZE;

    Event.find({}, {}, {
      skip: 0,
      take: 10,
      limit: 10,
      sort: {
        date: -1
      }
    }, function (err, events) {
      if (err) {
        // res.redirect('error')
        throw err;
      }

      data.newestEvents = events || {};

      Event.find({}, {}, {
        skip: 0,
        take: 10,
        limit: 10,
        sort:{
          comments: -1
        }
      }, function (err, events) {
        if (err) {
          // res.redirect('error')
          throw err;
        }

        data.mostCommentedEvents = events || {};

        data.user = req.user;
        console.log(data);
        res.render('./home', data);
      })
    })
  }
};
