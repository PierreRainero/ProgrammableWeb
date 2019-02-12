/**
 * REST API for Products
 * /products
 *      - GET : Return "all" products (by groups)
 * /products/{productCode}
 *     - GET : Return product corresponding to productCode
 */
const franceDb = require('../database/france.js');
let router = require('express').Router();
const ise = require('../errors/internal-server-error');

/**
 * Get a specific product using his code
 * @param {express.Request} req Express HTTP request containing product code as path parameter
 * @param {express.Response} res Express HTTP response containing corresponding product
 */
const getProductByCode = async (req, res) => {
    if (!req.params.productCode || req.params.productCode === '') {
        res.status(400).send("Product id is missing.");
        return;
    }

    franceDb.findByCode(
        req.params.productCode,
        (productFound) => {
            res.status(200).send(productFound);
        },
        (error) => {
          ise(res, error, 'There was an error finding the product.');
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
    if (queryParameters !== undefined) {
        if (queryParameters.name) {
            if (queryParameters.page && !isNaN(queryParameters.page) && queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage)) {
                getProductsByName(res, queryParameters.name, parseInt(queryParameters.page), parseInt(queryParameters.itemsPerPage));
            } else {
                getProductsByName(res, queryParameters.name, 1, 20);
            }
        } else if (queryParameters.ingredient) {
            if (queryParameters.page && !isNaN(queryParameters.page) && queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage)) {
                getProductsByIngredient(res, queryParameters.ingredient, parseInt(queryParameters.page), parseInt(queryParameters.itemsPerPage));
            } else {
                getProductsByIngredient(res, queryParameters.ingredient, 1, 20);
            }
        } else if (queryParameters.page && !isNaN(queryParameters.page) && queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage)) {
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
 * @param {number} page page number to display (itemsPerPage*page)
 * @param {number} itemsPerPage number of products per diplayed by page
 */
const getAllProductsWithIndex = (res, page, itemsPerPage) => {
    franceDb.findAll(
        page, itemsPerPage,
        (productsFound) => {
            res.status(200).send(productsFound);
        },
        (error) => {
          ise(res, error, 'There was an error finding the products.');
        });
}

/**
 * Get all products (ordered by id) that match to the given string.
 * @param {express.Response} res Express HTTP response containing corresponding products
 * @param {number} page page number to display (itemsPerPage*page)
 * @param {number} itemsPerPage number of products per diplayed by page
 * @param {*} name String to match
 */
const getProductsByName = (res, name, page, itemsPerPage) => {
    franceDb.searchByName(
        name, page, itemsPerPage,
        (productsFound) => {
            res.status(200).send(productsFound);
        },
    (error) => {
      if(config.PRODUCTION)
        console.log("Error: " + error.message);
      res.status(500).send(error.message);
    });
}

const getProductsByIngredient = (res, ingredient, page, itemsPerPage) => {
    franceDb.findAllByIngredient(
        ingredient, page, itemsPerPage,
        (productsFound) => {
            res.status(200).send(productsFound);
        },
        (error) => {
          ise(res, error, 'There was an error finding the ingredients.');
        }
    );
}

// ROUTES :
router.get('/', getAllProducts);
router.get('/:productCode', getProductByCode);

module.exports = router;
