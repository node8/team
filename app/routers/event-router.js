'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth');

router.get('/create', auth.isInRole('admin'), controllers.events.getCreateEventForm);
router.get('/', controllers.events.getAllEvents);
router.post('/', auth.isInRole('admin'), controllers.events.createEvent);
router.get('/:id',auth.isAuthenticated, controllers.events.getEventById);
router.put('/', auth.isInRole('admin'), controllers.events.updateEvent);
router.get('/:id/update', auth.isInRole('admin'), controllers.events.getUpdateEventForm);
router.get('/:id/:title/addComment',auth.isAuthenticated, controllers.comments.getCommentCreationForm);
router.put('/join', auth.isAuthenticated, controllers.events.putJoin);

module.exports = function(app) {
  app.use('/events', router);
};
