var mongoose = require('mongoose'),
  user = require('../app/models/user'),
  town = require('../app/models/town'),
  comment = require('../app/models/comment'),
  rating = require('../app/models/rating'),
  event = require('../app/models/event');

module.exports = function(config) {
  user.seedInitialUsers();
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
}
