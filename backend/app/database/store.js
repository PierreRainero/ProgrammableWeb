const mongoose = require('./database').mongoose;
const db = require('./database').db;
const GeoPoint = require('geopoint');

const storeSchema = mongoose.Schema({
  name: { type: String, require: true },
  region: { type: String, require: true },
  location: {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true }
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
  storeModel.find({ _id: id }).exec((err, result) => {
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

const findAllByLocation = (lat, lng, range, regions, successCallBack, errorCallback) => {
  storeModel.find({region: {$in: regions}}).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    const returnResult = new Array();
    let storeTmp = {};
    for (const store of result) {
      let myLocation = new GeoPoint(parseFloat(lat), parseFloat(lng));
      let storeLocation = new GeoPoint(store.location.lat, store.location.lng);
      let distance = myLocation.distanceTo(storeLocation, true);
      if (distance <= range) {
        storeTmp = { _id: store._id, distance: distance, location: store.location, region: store.region, name: store.name };
        returnResult.push(storeTmp);
      }
    }
    successCallBack(returnResult);
  })
}

const findByRegion = (region, successCallBack, errorCallback) => {
  storeModel.find({ region: region }).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    successCallBack(result);
  })
}

const create = (name, location, region, successCallBack, errorCallback) => {
  let store = new storeModel({
    name: name,
    location: location,
    region: region,
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
exports.findByRegion = findByRegion;
