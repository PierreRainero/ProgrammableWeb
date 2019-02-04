/**
 * This file is used if you wish to use this starter as a standard
 * server like Apache or Nginx.
 * The example of code below can be used to serve templates when user accesses
 * the URL of your domain that are listed before the 'module.exports' assignment.
 */
const Product = require('../model/product.js');
const https = require('https');

let express = require('express');
let join = require('path').join;

let router = new express.Router();

function home(req, res) {
  res.send('Home')
}

function searchForProduct(req, res) {
  if (!req.params.productid || req.params.productid === '') {
    res.send("Product id is missing.");
  }

  // @TODO
  // REMPLACER PAR APPEL A LA BASE MONGO
  https.get('https://fr.openfoodfacts.org/api/v0/produit/' + req.params.productid + '.json', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      const json = JSON.parse(data);
      let product = new Product(json.code, json.product.product_name_fr);
      res.send(product);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

router.get('/', home);
router.get('/product/:productid', searchForProduct);

module.exports = router;
