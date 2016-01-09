var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongoDd://localhost:27017/eventsystem',
        port: process.env.PORT || 3000,
    }
};