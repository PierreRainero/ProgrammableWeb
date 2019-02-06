const mongoose = require('./database').mongoose;
const db = require('./database').db;

const franceSchema = mongoose.Schema({
  _id: String,
  _keywords: [],
  checkers_tags: [],
  code: String,
  codes_tags: [],
  codes_tags: [],
  complete: Number,
  countries: String,
  countries_hierarchy: [],
  countries_tags: [],
  created_t: Number,
  creator: String,
  editors_tags: [],
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

const findAll = (page, itemsPerPage, successCallBack, errorCallback) => {
  franceModel.find({}).skip(itemsPerPage*(page-1)).limit(itemsPerPage).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }
    successCallBack(result);
  })
}

exports.findByCode = findByCode;
exports.findByKeyword = findByKeyword;
exports.findAllFromCategory = findAllFromCategory;
exports.findAll = findAll;
