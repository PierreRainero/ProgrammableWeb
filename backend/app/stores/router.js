/**
 * REST API for Stores
 * /stores
 *      - GET : Return "all" stores
 */
const storeDb = require('../database/store.js');
let router = require('express').Router();
const GeoPoint = require('geopoint');

/**
 * Get a specific store using its code
 * @param {express.Request} req Express HTTP request containing product code as path parameter
 * @param {express.Response} res Express HTTP response containing corresponding product
 */
const getStoreById = async (req, res) => {
    if (!req.params.storeId || req.params.storeId === '') {
        res.status(422).send("Store id is missing.");
        return;
    }

    storeDb.findById(
        req.params.storeId,
        (storeFound) => {
            if (storeFound.length === 1) {
                res.status(200).send(storeFound);
            } else {
                res.status(422).send("Invalid id.");
            }
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        }
    );
};

/**
 * Get all stores (ordered by id)
 * @param {express.Request} req Express HTTP request
 * @param {express.Response} res Express HTTP response
 */
const getAllStores = async (req, res) => {
    const queryParameters = req.query;
    if (queryParameters !== undefined) {
        if (queryParameters.lat && queryParameters.long && queryParameters.range
            && !isNaN(queryParameters.lat) && !isNaN(queryParameters.long) && !isNaN(queryParameters.range)) {
            getAllStoresByLocation(res, queryParameters.lat, queryParameters.long, queryParameters.range);
        } else {
            getAllStoresWithIndex(res, 1, 20);
        }
    } else {
        getAllStoresWithIndex(res, 1, 20);
    }
}

/**
 * Create a new store
 * @param {express.Request} req Express HTTP request containing recipe parameters (body)
 * @param {express.Response} res Express HTTP response
 */
const createStore = async (req, res) => {
    const bodyParameters = req.body;
    if (bodyParameters !== undefined) {
        if (!bodyParameters.name || bodyParameters.name === '') {
            res.status(422).send("Store name is missing.");
            return;
        }
        if (!bodyParameters.location || !bodyParameters.location.lat || !bodyParameters.location.lng) {
            res.status(422).send("Store location is missing.");
            return;
        }

        storeDb.create(
            bodyParameters.name,
            bodyParameters.location,
            (storeCreated) => {
                res.status(200).send(storeCreated.toJSON());
            },
            (error) => {
                console.log("Error: " + error.message);
                res.status(500).send(error.message);
            }
        );

    }
}


/**
 * Get all stores (ordered by id) by group. Each group can be defined using query parameters.
 * By default the page is "1" (first group) for "20" items per page (20 products by group).
 * @param {express.Response} res Express HTTP response containing corresponding products
 * @param {Number} page
 * @param {Number} itemsPerPage
 */
const getAllStoresWithIndex = (res, page, itemsPerPage) => {
    storeDb.findAll(
        page, itemsPerPage,
        (storesFound) => {
            res.status(200).send(storesFound);
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        });
}

/**
 * Get all stores by location and range.
 * @param {express.Response} res Express HTTP response containing corresponding products
 * @param {Number} locationX
 * @param {Number} locationY
 */
const getAllStoresByLocation = (res, lat, long, range) => {
    storeDb.findAll(
        1, 20,
        (storesFound) => {
            const result = new Array();
            let storeTmp = {};
            for (const store of storesFound) {
                let myLocation = new GeoPoint(parseFloat(lat), parseFloat(long));
                let storeLocation = new GeoPoint(store.location.lat, store.location.long);
                let distance = myLocation.distanceTo(storeLocation, true);
                if (distance <= range) {
                    storeTmp = { _id: store._id, distance: distance, location: store.location };
                    result.push(storeTmp);
                }
            }
            res.status(200).send(result);
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        });
}

// ROUTES :
router.get('/', getAllStores);
router.get('/:storeId', getStoreById);
router.post('/', createStore);

module.exports = router;
