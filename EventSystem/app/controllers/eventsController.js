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
  },
  createEvent: function(req, res, next) {
    var newEvent = {};
    newEvent = {
      title: req.body.title,
      description: req.body.description
    };

    Event.create(newEvent, function(err, createdEvent){
        if (err) {
          console.log('Failed to create new event: ' + err);
          return;
        }
        res.render('events/event-details', {
          title: 'New event',
          event: createdEvent
        });
      })
  },
  getEventById: function(req, res, next) {
    Event.findOne( { _id: req.params.id } ).exec(function(err, event){
      if(err){
        console.log("Event could not be found" + err);
        res.status(404).end();
      }

      console.log("Event got!");
      res.render('events/event-details', {
        title: 'New event',
        event: event
      });
    })
  }
};
