
let router = require('express').Router();
const franceDb = require('../database/france.js');
const priceDb = require('../database/price.js');
const ise = require('../errors/internal-server-error');

const createPriceInfo = async (req, res) => {
  if(!req.body.productCode)
    return res.status(400).send('The product code is missing.');
  if(!req.body.storeId)
    return res.status(400).send('The store id is missing.');
  if(!req.body.price)
    return res.status(400).send('The price is missing.');
  if(req.body.price <= 0)
    return res.status(422).send('The price has to be positive.');
  franceDb.findByCode(req.body.productCode, (product) => {
    if(product.length == 0)
      return res.status(422).send('The product id is incorrect');
    // storeDb.findById(req.body.storeId, (store) => {
    //   if(!store)
    //     return res.status(422).send('The store id is incorrect');
      priceDb.insert(req.body.productCode, req.body.storeId, req.body.price, () => {
        res.status(200).send('OK');
      }, err => {
        ise(res, error, 'There was an error inserting the price info.');
      })
    // }, err => {
    //   ise(res, error, 'There was an error checking the store id.');
    // })
  }, err => {
    ise(res, err, 'There was an error checking the product code.');
  })
}

const getPrices = async (req, res) => {
  priceDb.find(req.query.productCode, req.query.storeId, result => {
    res.status(200).send(result);
  }, err => {
    ise(res, err, 'There was an error getting the prices.')
  })
}

router.post('/', createPriceInfo);
router.get('/', getPrices);

module.exports = router;
