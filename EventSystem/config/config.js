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
    db: 'mongodb://localhost/nodejsteamwork-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodejsteamwork'
    },
    port: 3000,
    db: 'mongodb://localhost/nodejsteamwork-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodejsteamwork'
    },
    port: 3000,
    db: 'mongodb://localhost/nodejsteamwork-production'
  }
};

module.exports = config[env];
