'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth');

/* Events */
// --- PUBLIC (ALL) ---

router.get('/create', auth.isInRole('admin'), controllers.events.getCreateEventForm);

// GET events - Gets top 10 public events, sorted by their date of creation
router.get('/', controllers.events.getAllEvents);

//// --- ADMIN ONLY ---
//POST events - Creates a new event and redirects to the newly created event
// TODO: auth.isInRole('admin'),
router.post('/', auth.isInRole('admin'), controllers.events.createEvent);

////GET events/{eventId} - Gets event (details) with Id = eventId, with 10 comments sorted by date
router.get('/:id', controllers.events.getEventById);

router.put('/', auth.isInRole('admin'), controllers.events.updateEvent);

// GET events/{eventId}/update - Gets the view for updating event information - accessible only by admin
router.get('/:id/update', auth.isInRole('admin'), controllers.events.getUpdateEventForm);

//GET events?page=page (*P) - Gets the events at positions from P10 to (P+1)10. The events sorted by date of creation and are at most 10.
// TODO: app.get('/:id', controllers.events.getEvents);
router.get('/:id/addComment', controllers.comments.getCommentCreationForm);

////POST events/{eventId}/rate header body: { “rate”: 1-5 (int)} - Creates rating by the current user for the event with Id = eventId
//app.post('/:id/rate', controllers.ratings.rateEvent);

//POST events/{eventID}/join - Current user can join to the event with Id = eventId
router.put('/join', controllers.events.putJoin);

////PUT events/{eventId} - Update an existing event, redirects to events
//app.put('/:id', auth.isInRole('admin'), controllers.events.updateEventById);
//
////DELETE events/{eventId} - Delete an existing event, returns the event created so it can be loaded in the UI
//app.delete('/:id', auth.isInRole('admin'), controllers.events.deleteEvent);

module.exports = function(app) {
  app.use('/events', router);
}
