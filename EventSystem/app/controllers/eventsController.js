'use strict'

var Event = require('mongoose').model('Event');
var Comment = require('mongoose').model('Comment');
var constants = require('../common/constants');

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
  createEvent: function(req, res) {
    var newEvent = {};
    newEvent = {
      title: req.body.title,
      description: req.body.description,
      userId: req.user._id,
      username: req.user.username,
      date: req.body.date,
      town: req.body.town,
      image: req.body.image
    };

    Event.create(newEvent, function(err, createdEvent){
      if (err) {
        console.log('Failed to create new event: ' + err);
        return;
      }
      res.redirect('events/' + createdEvent._id);
    })
  },
  getEventById: function(req, res) {
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

        if (!getEvent.image){
          getEvent.image = constants.defaultImage;
        }

        res.render('events/event-details', {
          title: 'Event details:',
          event: getEvent,
          user: req.user,
          comments: commentsByEventId,
        });
      });
    });
  },
  getUpdateEventForm: function(req, res) {
    Event.findById(req.params.id, function(err, event) {
      if (err) {
        res.render('error', {
          title: 'There was an error!',
          user: req.user,
          message: 'There was a problem finding the event.',
          error: {
            status: '404 Not Found',
            stack: 'Stack not provided'
          }
        })
      }

      res.render('events/update-event', {
        user: req.user,
        title: 'Update event',
        event: event
      });
    });
  },
  updateEvent: function(req, res) {
    Event.findById(req.body.eventId, function(err, event) {
      if (err) {
        res.render('error', {
          title: 'There was an error',
          user: req.user,
          message: 'There was a problem finding the event for update.',
          error: {
            status: '404 Not Found',
            stack: 'Stack not provided'
          }
        });
      }

      if (event == null) {
        res.render('error', {
          title: 'There was an error',
          user: req.user,
          message: 'There was a problem finding the event for update.',
          error: {
            status: '404 Not Found',
            stack: 'Stack not provided'
          }
        });
      }

      event.title = req.body.title;
      event.description = req.body.description;
      event.date = req.body.date;
      event.town = req.body.town;
      event.image = req.body.image;
      event.save();

      res.send('/events/' + req.body.eventId);
  },
  putJoin: function(req, res){
    var eventId = req.body.eventId;
    var username = req.user.username;

    Event.findOne( { _id: eventId } ).exec(function(err, event){
      if(err){
        console.log("Event could not be found" + err);
        return;
      }

      if(event.users.length <= 0){
        event.users = [];
      }
      event.users.push({username:username});
      event.save();

      console.log(username + " joined event with id " + eventId);

      res.send('/events/' + eventId);
    });
  }
};
