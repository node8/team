'use strict'

var Event = require('mongoose').model('Event');
var Comment = require('mongoose').model('Comment');

module.exports = {
  getAllEvents: function(req, res, next) {
    Event.find({}).exec(function (err, events) {
      if (err) {
        return next(err);
      }
      res.render('events/list-events', {
        title: 'Events list',
        events: events,
        user: req.user
      });
    });
  },
  getCreateEventForm: function(req, res) {
    res.render('events/create-event', {
      title: 'Create new event',
      description: 'Create new event',
      user: req.user
    })
  },
  createEvent: function(req, res, next) {
    var newEvent = {};
    newEvent = {
      title: req.body.title,
      description: req.body.description,
      userId: req.user._id,
      username: req.user.username,
      date: req.body.date,
      town: req.body.town
    };

    Event.create(newEvent, function(err, createdEvent){
      if (err) {
        console.log('Failed to create new event: ' + err);
      }
      res.redirect('events/');
    })
  },
  getEventById: function(req, res, next) {
    Event.findOne( { _id: req.params.id } ).exec(function(err, getEvent){
      if(err){
        console.log("Event could not be found" + err);
        res.status(404).end();
        return;
      }

      Comment.find( { eventId: req.params.id }).exec(function(err, commentsByEventId){
        if(err){
          console.log("Comments failed to be loaded" + err);
        }

        res.render('events/event-details', {
          title: 'Event details:',
          event: getEvent,
          user: req.user,
          comments: commentsByEventId
        });
      });
    });
  }
};
