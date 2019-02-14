/**
 * REST API for Regions
 * /regions
 *      - GET : Return "all" regions
 */
const regionDb = require('../database/region.js');
let router = require('express').Router();
const GeoPoint = require('geopoint');


const getAllRegions = async (req, res) => {
    regionDb.findAll(
        (regionsFound) => {
            res.status(200).send(regionsFound);
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        }
    );
}

// ROUTES :
router.get('/', getAllRegions);

module.exports = router;
