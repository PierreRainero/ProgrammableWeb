/**
 * This is the configuration file of the project.
 * This is the file where you can set up environment variable,
 * in order to hide them elsewhere in the application,
 * for example: secrets for JWT authentication, your database
 * ports and IP, etc....
 */

let config = module.exports;
let PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
  port: process.env.PORT || 8080,
  ip: '127.0.0.1'
};

config.mongodb = {
  port: process.env.MONGODB_PORT || 11455,
  host: process.env.MONGODB_HOST || 'ds111455.mlab.com',
  username: process.env.MONGODB_USERNAME || 'root',
  password: process.env.MONGODB_PASSWORD || 'mich06',
  database: process.env.MONGODB_DATABASE || 'progweb'
};
if (PRODUCTION) {
  // for example
  config.express.ip = '0.0.0.0'
}
// config.db same deal
// config.email etc
// config.log
