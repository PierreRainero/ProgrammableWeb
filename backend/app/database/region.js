const mongoose = require('./database').mongoose;
const db = require('./database').db;
const GeoPoint = require('geopoint');

const regionsSchema = mongoose.Schema({
  name: String,
  code: String,
  center: {
    lat: Number,
    lng: Number
  },
  radius: Number
});

let regionsModel = db.model(
  'regions',
  regionsSchema,
  'regions'
);

const findAll = async (successCallBack, errorCallback) => {
  regionsModel.find({}).exec((err, result) => {
    if (err)
      return errorCallback(err);
    successCallBack(result);
  });
}

const getRegionsForLocation = async (lat, lng, successCallBack, errorCallback) => {
  regionsModel.find({}).exec((err, result) => {
    if (err)
      return errorCallback(err);
    let resultRegion = new Array();
    for (region of result) {
      let myLocation = new GeoPoint(parseFloat(lat), parseFloat(lng));
      let regionLocation = new GeoPoint(region.center.lat, region.center.lng);
      if (myLocation.distanceTo(regionLocation) < region.radius) {
        resultRegion.push(region);
      }
    }
    successCallBack(resultRegion);
  });
}

module.exports = {
  findAll: findAll,
  getRegionsForLocation: getRegionsForLocation,
};
