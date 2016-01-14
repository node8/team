'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers'),
  auth = require('../../config/auth'),
  passport = require('passport');

router.get('/', auth.isInRole('admin'), controllers.users.getAllUsers);
router.get('/register', function(req, res) {
  res.render('users/register', {title:'Registration form'})
});
router.post('/register', controllers.users.createUser);
router.put('/:id', auth.isAuthenticated, controllers.users.updateUser);
router.delete('/', auth.isInRole('admin'), controllers.users.deleteUser);
router.get('/login', function (req, res) {
  res.render('users/login', {title: 'Login form'});
});
router.get('/:id', controllers.users.getUserDetails);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/users/login'
}));
router.get('/logout', auth.logout);

module.exports = function (app) {
  app.use('/users', router);
};
