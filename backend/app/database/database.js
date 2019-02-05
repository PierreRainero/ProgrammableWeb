let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const db = mongoose.createConnection('mongodb://root:mich06@ds111455.mlab.com:11455/progweb');

exports.db = db;
exports.mongoose = mongoose;
