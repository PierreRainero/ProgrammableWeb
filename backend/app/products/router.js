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
                res.status(200).send(parseProduct(productFound[0].toJSON()));
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
 * @param {express.Request} req Express HTTP request 
 * @param {express.Response} res Express HTTP response
 */
const getAllProducts = async (req, res) => {
    const queryParameters = req.query;

    if(queryParameters!==undefined){
        if(queryParameters.name){
            getProductsByName(res, queryParameters.name);
        } else if(queryParameters.ingredient){
            getProductsByIngredient(res, queryParameters.ingredient);
        } else if(queryParameters.page && !isNaN(queryParameters.page) && queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage)){
            getAllProductsWithIndex(res, parseInt(queryParameters.page), parseInt(queryParameters.itemsPerPage));
        } else {
            getAllProductsWithIndex(res, 1, 20);
        }
    } else {
        getAllProductsWithIndex(res, 1, 20);
    }
}

/**
 * Get all products (ordered by id) by group. Each group can be defined using query parameters.
 * By default the page is "1" (first group) for "20" items per page (20 products by group).
 * @param {express.Response} res Express HTTP response containing corresponding products
 * @param {*} page 
 * @param {*} itemsPerPage 
 */
const getAllProductsWithIndex = (res, page, itemsPerPage) => {
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

const getProductsByName = (res, name) => {
    res.status(200).send(name);
}

const getProductsByIngredient = (res, ingredient) => {
    res.status(200).send(ingredient);
}

/**
 * Generate a Product object from a json object from the database
 * @param {Object} productJson json object
 * @return {Product} product parsed
 */
const parseProduct = (productJson) => {
    const product = new Product(parseInt(productJson.code), productJson.product_name, productJson.nutrition_grades, productJson.nova_group);

    const ingredients = productJson.ingredients;
    if(ingredients && ingredients.length>0){
        for(const ingredient of ingredients){
            product.addIngredient(ingredient.id, ingredient.text);
        }
    }

    if(productJson.allergens_from_ingredients){
        const allergens = productJson.allergens_from_ingredients.split(', ');
        if(allergens.length>0){
            for(const allergen of allergens){
                product.addAllergen(allergen);
            }
        }
    }

    const additives = productJson.additives_prev_original_tags;
    if(additives && additives.length>0){
        for(const additive of additives){
            product.addAdditive(additive);
        }
    }

    product.calculateScore();
    return product;
}

// ROUTES :
router.get('/products', getAllProducts);
router.get('/products/:productCode', getProductByCode);

module.exports = router;