/**
 * This is the "main file" of the project.
 * This is the file where you will declare the routes of
 * your REST application, protect routes with middleware,
 * etc...
 */

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

// Body parser to be able to read the json in th request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

// Load the routes
app.use('/api', require('./site/router'));

// FINALLY, use any error handlers
app.use(require('./errors/not-found'));

// Export the app instance for unit testing via supertest
module.exports = app;
