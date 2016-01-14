var express = require('express'),
  config = require('./config/config'),
  passport = require('passport');

var app = express();

require('./config/mongoose')(config);
require('./config/passport')(passport);
require('./config/express')(app, config);
require('./app/routers')(app);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

