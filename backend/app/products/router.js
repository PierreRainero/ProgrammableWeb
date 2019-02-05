/**
 * REST API for Products
 * 
 * /products/{productCode}
 *     - GET : Return product corresponding to productCode
 */
const Product = require('./product.js');
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
    }

    // @TODO
    // REMPLACER PAR APPEL A LA BASE MONGO
    https.get('https://fr.openfoodfacts.org/api/v0/produit/' + req.params.productid + '.json', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const json = JSON.parse(data);
            let product = new Product(json.code, json.product.product_name_fr);
            res.status(200).send(product);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).send(err.message);
    });
};

// ROUTES :
router.get('/products/:productid', getProductByCode);

module.exports = router;