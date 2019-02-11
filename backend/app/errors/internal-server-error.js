/**
 * You should put the common errors behaviors (404, 403, 402, 401, 400, 500, etc...)
 * in here, in order to import this file through the application, and make
 * the server have the same behavior when an error occurs.
 */

const config = require('../config');

const internalServerError = (res, err, message) => {
  if(!config.PRODUCTION)
    console.log(err);
  res.status(500)
    .send(message)
};

module.exports = internalServerError;
