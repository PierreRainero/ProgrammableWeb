/**
 * REST API for Products
 * 
 * /products/{productCode}
 *     - GET : Return product corresponding to productCode
 */
const Product = require('./product.js');
const franceDb = require('../database/france.js');
let router = require('express').Router();
const https = require('https');

/**
 * Get a specific product using his code
 * @param {express.Request} req Express HTTP request containing product code as path parameter
 * @param {express.Response} res Express HTTP response containing corresponding product
 */
const getProductByCode = async (req, res) => {
    if (!req.params.productid || req.params.productid === '') {
        res.status(422).send("Product id is missing.");
        return;
    }

    franceDb.findByCode(
        req.params.productid,
        (productFound) => {
            if(productFound.length === 1){
                const json = JSON.parse(JSON.stringify(productFound[0]));
                const product = new Product(json.code, json.product_name_fr);
                res.status(200).send(product);
            }else{
                res.status(422).send("Invalid code.");
            }
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        }
    );
};

// ROUTES :
router.get('/products/:productid', getProductByCode);

module.exports = router;