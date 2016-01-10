var auth = require('./auth'),
  controllers = require('../app/controllers');

module.exports = function(app) {
/* Users */
  //app.get('/users', auth.isInRole('admin'), controllers.users.getAllUsers);
  //// GET users/profile/{userId} - gets an existing user
  //app.get('/users/:id', controllers.users.getUserById);
  //
  //// GET users/register - returns user(s) registration form
  //app.get('/users/register', controllers.users.registrationFrom);
  //
  //// POST users/register - Registers a new user in the events system
  //app.post('/users/register', controllers.users.createUser);
  //
  //// PUT users/profile/{userId} - updates an existing user
  //app.put('/users/:id', auth.isAuthenticated, controllers.users.updateUser);
  //
  //// POST users/login - Logs in a user in the events system
  //app.post('/users/login', auth.login);
  //
  //// PUT users/logout - Logs out a user from the events system
  //app.post('users/logout', auth.logout);

  /* Events */
  // --- PUBLIC (ALL) ---

  // GET events - Gets top 10 public events, sorted by their date of creation
  app.get('/events', controllers.events.getAllEvents);

  ////GET events/{eventId} - Gets event (details) with Id = eventId, with 10 comments sorted by date
  // app.get('/events/:id', controllers.events.getEventById);
  //
  // //GET events?page=page (*P) - Gets the events at positions from P10 to (P+1)10. The events sorted by date of creation and are at most 10.
  // // TODO: app.get('/events/:id', controllers.events.getEvents);
  //
  ////POST events/{eventID}/comments - Creates a new comment for a given event
  //app.post('/events/:id/comments', controllers.comments.postComment);
  //
  ////POST events/{eventId}/rate header body: { “rate”: 1-5 (int)} - Creates rating by the current user for the event with Id = eventId
  //app.post('/events/:id/rate', controllers.ratings.rateEvent);
  //
  ////POST events/{eventID}/join - Current user can join to the event with Id = eventId
  //app.post('/events/:id/join', controllers.events.joinEvent);
  //
  // //POST events/{eventID}/leave - Current user can leave an event with ID = eventId
  //app.post('/events/:id/leave', controllers.events.leaveEvent);
  //
  //// --- ADMIN ONLY ---
  //POST events - Creates a new event and redirects to the newly created event
  // TODO: auth.isInRole('admin'),
  app.post('/events', controllers.events.createEvent);

  //
  ////PUT events/{eventId} - Update an existing event, redirects to events
  //app.put('/events/:id', auth.isInRole('admin'), controllers.events.updateEventById);
  //
  ////DELETE events/{eventId} - Delete an existing event, returns the event created so it can be loaded in the UI
  //app.delete('/events/:id', auth.isInRole('admin'), controllers.events.deleteEvent);

  // NOT FOUND
  app.get('/*', function(req, res) {
    res.status(404);
    res.end();
  });

  app.get('*', function(req, res) {
    res.render('index', {currentUser: req.user});
  });
};
