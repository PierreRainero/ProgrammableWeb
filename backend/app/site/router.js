/**
 * This file is used if you wish to use this starter as a standard
 * server like Apache or Nginx.
 * The example of code below can be used to serve templates when user accesses
 * the URL of your domain that are listed before the 'module.exports' assignment.
 */
let express = require('express');
let join = require('path').join;

let router = new express.Router();

router.use('/products', require('../products/router'));
router.use('/prices', require('../prices/router'));
router.use('/recipes', require('../recipes/router'));
router.use('/stores', require('../stores/router'));

module.exports = router;
