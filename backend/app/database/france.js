const mongoose = require('./database').mongoose;
const db = require('./database').db;

const franceSchema = mongoose.Schema({
  _id: String,
  _keywords: [],
  checkers_tags: [],
  code: String,
  codes_tags: [],
  complete: Number,
  correctors_tags: ,
  countries: String,
  countries_hierarchy: [],
  countries_tags: [],
  created_t: Number,
  creator: String,
  entry_dates_tags: [],
  id: String,
  informers_tags: [],
  interface_version_created: String,
  languages: {},
  languages_codes: {},
  languages_hierarchy: [],
  languages_tags: [],
  last_edit_dates_tags: [],
  last_modified_by: String,
  last_modified_t: Number,
  lc: String,
  photographers_tags: [],
  rev: Number,
  sortkey: Number,
  states: String,
  states_hierarchy: [],
  states_tags: [],
}, {
    strict: true
  });

let franceModel = db.model(
  'france',
  franceSchema,
  'france'
);

const findAll = (successCallBack, errorCallback) => {
  franceModel.find({}).exec((err, result) => {
    if(err)
      return errorCallback(err);
    successCallBack(result);
  })
}

const findByCode = (code, successCallBack, errorCallback) => {
  franceModel.find({ code: code }).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    successCallBack(result);
  })
}

const findByKeyword = (kw, successCallBack, errorCallback) => {

}

const findAllFromCategory = (kw, successCallBack, errorCallback) => {

}

exports.findAll = findAll;
exports.findByCode = findByCode;
exports.findByKeyword = findByKeyword;
exports.findAllFromCategory = findAllFromCategory;
