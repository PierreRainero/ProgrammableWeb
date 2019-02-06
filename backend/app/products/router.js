/**
 * REST API for Products
 * /products
 *      - GET : Return "all" products (by groups)
 * /products/{productCode}
 *     - GET : Return product corresponding to productCode
 */
const Product = require('./product.js');
const franceDb = require('../database/france.js');
let router = require('express').Router();

/**
 * Get a specific product using his code
 * @param {express.Request} req Express HTTP request containing product code as path parameter
 * @param {express.Response} res Express HTTP response containing corresponding product
 */
const getProductByCode = async (req, res) => {
    if (!req.params.productCode || req.params.productCode === '') {
        res.status(422).send("Product id is missing.");
        return;
    }

    franceDb.findByCode(
        req.params.productCode,
        (productFound) => {
            if(productFound.length === 1){
                const product = parseProduct(productFound[0].toJSON());
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

/**
 * Get all products (ordered by id) by group. Each group can be defined using query parameters.
 * By default the page is "1" (first group) for "20" items per page (20 products by group).
 * @param {express.Request} req Express HTTP request containing "page" and "itemsPerPage" as query parameters
 * @param {express.Response} res Express HTTP response containing corresponding products
 */
const getAllProducts = async (req, res) => {
    const queryParameters = req.query;
    let page = 1;
    let itemsPerPage = 20;
    if(queryParameters!==undefined || queryParameters.length > 1){
        page = queryParameters.page && !isNaN(queryParameters.page) && queryParameters.page>0 ? parseInt(queryParameters.page) : 1;
        itemsPerPage = queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage) && queryParameters.itemsPerPage>0 ? parseInt(queryParameters.itemsPerPage) : 20;
    }

    franceDb.findAll(
        page, itemsPerPage,
        (productsFound) => {
        const products = new Array();
        for(const product of productsFound){
            products.push(parseProduct(product.toJSON()));
        }
            res.status(200).send(products);
        },
    (error) => {
        console.log("Error: " + error.message);
        res.status(500).send(error.message);
    });
}

/**
 * Generate a Product object from a json object from the database
 * @param {Object} productJson json object
 * @return {Product} product parsed
 */
const parseProduct = (productJson) => {
    const product = new Product(parseInt(productJson.code), productJson.product_name);

    const ingredients = productJson.ingredients;
    if(ingredients && ingredients.length>0){
        for(const ingredient of ingredients){
            product.addIngredient(ingredient.id, ingredient.text);
        }
    }

    return product;
}

// ROUTES :
router.get('/products', getAllProducts);
router.get('/products/:productCode', getProductByCode);

module.exports = router;