var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodejsteamwork'
    },
    port: 3000,
    db: 'mongodb://admin:admin@ds039185.mongolab.com:39185/eventsystem'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodejsteamwork'
    },
    port: 3000,
    db: 'mongodb://admin:admin@ds039185.mongolab.com:39185/eventsystem'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodejsteamwork'
    },
    port: 3000,
    db: 'mongodb://admin:admin@ds039185.mongolab.com:39185/eventsystem'
  }
};

module.exports = config[env];
