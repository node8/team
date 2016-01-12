'use strict';

var fs = require('fs'),
  path = require('path');

module.exports = function(app) {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('-router') >= 0)
    .forEach(file => require(path.join(__dirname, file))(app));

  app.get('/*', function(req, res) {
    res.render('error', {
        message: 'The page you are looking for could not be found!',
        error: {
          status: "Status: Error 404",
          stack: "Stack not provided!"
        },
        title: 'Error',
        description: 'An error happended',
        user: req.user
      }
    );
  });

  app.get('*', function(req, res) {
    res.render('index', {user: req.user});
  });
};
