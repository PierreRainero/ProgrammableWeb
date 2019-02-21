const mongoose = require('./database').mongoose;
const db = require('./database').db;

const pricesSchema = mongoose.Schema({
  product_id: String,
  store_id: mongoose.Schema.Types.ObjectId,
  price: Number
});

let pricesModel = db.model(
  'prices',
  pricesSchema,
  'prices'
);

const insert = async (productCode, storeId, price, successCallBack, errorCallback) => {
  pricesModel.create({
    product_id: productCode,
    store_id: mongoose.Types.ObjectId(storeId),
    price: price
  }, (err, result) => {
    if(err)
      return errorCallback(err);
    successCallBack();
  })
}

const find = async (productCode, storeId, successCallBack, errorCallback) => {
  let query = {};
  if(productCode)
    query.product_id = productCode;
  if(storeId)
    query.store_id = storeId;
  pricesModel.find(query).exec((err, result) => {
    if(err)
      return errorCallback(err);
    successCallBack(result);
  });
}

module.exports = {
  insert: insert,
  find: find,
};
