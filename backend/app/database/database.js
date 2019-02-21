const config = require('../config');

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const db = mongoose.createConnection('mongodb://' + config.mongodb.username + ':' + config.mongodb.password + '@' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database, { useNewUrlParser: true });

exports.db = db;
exports.mongoose = mongoose;
