'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth'),
  passport = require('passport');

/* Users */
// GET
// auth.isInRole('admin')
router.get('/', auth.isAuthenticated, controllers.users.getAllUsers);

//// GET users/profile/{userId} - gets an existing user
//router.get('/:id', controllers.users.getUserById);
//
//// GET users/register - returns user(s) registration form
router.get('/register', function(req, res) {
  res.render('users/register', {title:'Registration form'})
});

// POST users/register - Registers a new user in the events system
router.post('/register', controllers.users.createUser);

// PUT users/profile/{userId} - updates an existing user
router.put('/:id', auth.isAuthenticated, controllers.users.updateUser);


// GET users/login - returns user login form
router.get('/login', function (req, res) {
  res.render('users/login', {title: 'Login form'});
});

//// POST users/login - Logs in a user in the events system
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));
//
//// PUT users/logout - Logs out a user from the events system
router.get('/logout', auth.logout);

module.exports = function (app) {
  app.use('/users', router);
};
