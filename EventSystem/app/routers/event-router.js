'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth');

/* Events */
// --- PUBLIC (ALL) ---

// GET events - Gets top 10 public events, sorted by their date of creation
router.get('/', controllers.events.getAllEvents);

////GET events/{eventId} - Gets event (details) with Id = eventId, with 10 comments sorted by date
router.get('/:id', controllers.events.getEventById);
//
// //GET events?page=page (*P) - Gets the events at positions from P10 to (P+1)10. The events sorted by date of creation and are at most 10.
// // TODO: app.get('/:id', controllers.events.getEvents);
//
////POST events/{eventID}/comments - Creates a new comment for a given event
//app.post('/:id/comments', controllers.comments.postComment);
//
////POST events/{eventId}/rate header body: { “rate”: 1-5 (int)} - Creates rating by the current user for the event with Id = eventId
//app.post('/:id/rate', controllers.ratings.rateEvent);
//
////POST events/{eventID}/join - Current user can join to the event with Id = eventId
//app.post('/:id/join', controllers.events.joinEvent);
//
// //POST events/{eventID}/leave - Current user can leave an event with ID = eventId
//app.post('/:id/leave', controllers.events.leaveEvent);
//
//// --- ADMIN ONLY ---
//POST events - Creates a new event and redirects to the newly created event
// TODO: auth.isInRole('admin'),
router.post('/', controllers.events.createEvent);

router.get('/create', auth.isInRole('admin'), controllers.events.getCreateEventForm);
//
////PUT events/{eventId} - Update an existing event, redirects to events
//app.put('/:id', auth.isInRole('admin'), controllers.events.updateEventById);
//
////DELETE events/{eventId} - Delete an existing event, returns the event created so it can be loaded in the UI
//app.delete('/:id', auth.isInRole('admin'), controllers.events.deleteEvent);


module.exports = function(app) {
  app.use('/events', router);
}
