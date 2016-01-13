var Event = require('mongoose').model('Event');
var Comment = require('mongoose').model('Comment');

module.exports = {
  getAllEvents: function(req, res, next) {
    Event.find(function (err, events) {
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
      user: req.user
    };

    Event.create(newEvent, function(err, createdEvent){
        if (err) {
          console.log('Failed to create new event: ' + err);
          return;
        }
        res.render('events/event-details', {
          title: 'New event',
          event: createdEvent,
          user: req.user
        });
      })
  },
  getEventById: function(req, res, next) {
    Event.findOne( { _id: req.params.id } ).exec(function(err, getEvent){
      if(err){
        console.log("Event could not be found" + err);
        res.status(404).end();
      }

      Comment.find( { eventId: req.params.id }).exec(function(err, commentsByEventId){
        if(err){
          console.log("Comments failed to be loaded" + err);
        }

        console.log(commentsByEventId);

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
