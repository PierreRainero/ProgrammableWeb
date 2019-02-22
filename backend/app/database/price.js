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
    if (err)
      return errorCallback(err);
    successCallBack();
  })
}

const find = async (productCode, storeId, successCallBack, errorCallback) => {
  let query = {};
  if (productCode)
    query.product_id = productCode;
  if (storeId)
    query.store_id = storeId;
  pricesModel.find(query).populate({ path: 'store_id', model: 'stores', select: ['name', '_id'] }).exec((err, result) => {
    if (err)
      return errorCallback(err);
    successCallBack(result);
  });
}

const findProductsMeanPrice = async (productsCodes, successCallBack, errorCallback) => {
  pricesModel.aggregate([
    { $match: { product_id: { $in: productsCodes } } },
    { $group: { _id: "$product_id", avgPrice: { $avg: "$price" } } }
  ], function (err, productMeanPrices) {
    if (err) {
      errorCallback(err);
    }
    let totalPrice = 0;

    for (const productMeanPrice of productMeanPrices) {
      totalPrice += productMeanPrice.avgPrice;
    }
    successCallBack(totalPrice);
  });
}

module.exports = {
  insert: insert,
  find: find,
  findProductsMeanPrice: findProductsMeanPrice
};
