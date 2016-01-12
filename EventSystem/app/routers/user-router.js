'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth');

/* Users */
// GET
router.get('/', auth.isInRole('admin'), controllers.users.getAllUsers);

//// GET users/profile/{userId} - gets an existing user
//router.get('/:id', controllers.users.getUserById);
//
//// GET users/register - returns user(s) registration form
//router.get('/register', controllers.users.registrationFrom);

// POST users/register - Registers a new user in the events system
router.post('/register', controllers.users.createUser);

// PUT users/profile/{userId} - updates an existing user
router.put('/:id', auth.isAuthenticated, controllers.users.updateUser);

//// POST users/login - Logs in a user in the events system
//router.post('/login', auth.login);
//
//// PUT users/logout - Logs out a user from the events system
//router.post('/logout', auth.logout);

module.exports = function(app) {
  app.use('/users', router);
};
