const mongoose = require('./database').mongoose;
const db = require('./database').db;
const middleware = require('../products/middleware.js');

const franceSchema = mongoose.Schema({
  _id: String,
  _keywords: [],
  checkers_tags: [],
  code: String,
  codes_tags: [],
  complete: Number,
  correctors_tags: [],
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

const findAll = (page, itemsPerPage, successCallBack, errorCallback) => {
  franceModel.find({}).skip(itemsPerPage*(page-1)).limit(itemsPerPage).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }

    const products = new Array();
    for(const product of result){
        products.push(middleware.parseProduct(product.toJSON()));
    }
    successCallBack(products);
  })
}

const findByCode = (code, successCallBack, errorCallback) => {
  franceModel.find({ code: code }).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }

    if (result.length === 1) {
      successCallBack(middleware.parseProduct(result[0].toJSON()));
    } else {
      errorCallback('Invalid code.');
    }
  })
}

const searchByName = (productName, successCallBack, errorCallback) => {
  franceModel.find({ product_name: { "$regex": productName, "$options": "is" } }).exec((err, result) => {
    if (err) {
      return errorCallback(err);
    }

    const products = new Array();
    for(const product of result){
        products.push(middleware.parseProduct(product.toJSON()));
    }
    successCallBack(products);
  })
}

const findAllByIngredient = (ingredient, page, itemsPerPage, successCallBack, errorCallback) => {
  franceModel.find({ ingredients: { $elemMatch: {text: ingredient}} }).skip(itemsPerPage*(page-1)).limit(itemsPerPage).exec((err, result) => {
    if (err){
      return errorCallback(err);
    }

    const products = new Array();
    for(const product of result){
        products.push(middleware.parseProduct(product.toJSON()));
    }
    successCallBack(products);
  })
}

exports.findAll = findAll;
exports.findByCode = findByCode;
exports.searchByName = searchByName;
exports.findAllByIngredient = findAllByIngredient;
