const mongoose = require('./database').mongoose;
const db = require('./database').db;

const storeSchema = mongoose.Schema({
  name: { type: String, require: true },
  location: {
    lat: { type: Number, require: true },
    long: { type: Number, require: true }
  }
}, {
    strict: true
  });

let storeModel = db.model(
  'stores',
  storeSchema,
  'stores'
);

const findById = (id, successCallBack, errorCallback) => {
  storeModel.find({_id: id}).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    successCallBack(result);
  })
}

const findAll = (page, itemsPerPage, successCallBack, errorCallback) => {
  storeModel.find({}).skip(itemsPerPage * (page - 1)).limit(itemsPerPage).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    successCallBack(result);
  })
}

const findAllByLocation = (lat, long, range, successCallBack, errorCallback) => {
  storeModel.find({}).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    successCallBack(result);
  })
}

const create = (name, location, successCallBack, errorCallback) => {
  let store = new storeModel({
    name: name,
    location: location,
  })

  store.save()
    .then(store => {
      return successCallBack(store);
    })
    .catch(err => {
      return errorCallback(err);
    })
}

exports.findAll = findAll;
exports.findById = findById;
exports.findAllByLocation = findAllByLocation;
exports.create = create;
