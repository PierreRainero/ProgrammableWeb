const Ingredient = require('./ingredient.js');

/**
 * Format a key for an element of Open Food Facts
 * @param {string} key key to format
 */
const formatKey = (key) => {
    let res = key.replace('*', '').replace('_', '');
    res = replaceAll(res, /\s/, '-');
    res = removeLanguageTag(res, "en:");
    res = removeLanguageTag(res, "fr:");

    return res.substring(0, 1).toUpperCase() + res.substring(1).toLowerCase();
}

/**
 * Remove a tag language from an element
 * @param {string} element element to be treated
 * @param {string} tag language tag to remove
 */
const removeLanguageTag = (element, tag) => {
    const i = element.search(tag);
    return i > -1 ? element.substring(i + 3) : element;
}

/**
 * Replace all occurence of a model in a string by an other
 * @param {string} str string to modify
 * @param {string} find model to search
 * @param {string} replace model to replace
 */
const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * Class representing a product
 */
module.exports = class Product {

    /**
     * Normal constructor
     * @param {number} code Scan code
     * @param {string} name Product name
     */
    constructor(code, name) {
        this.code = code;
        this.name = !name ? "" : name;
        this.ingredients = new Array();
    }

    /**
     * Add an ingredient to the product
     * @param {string} id identifier to format for the ingredient
     * @param {string} name ingredient name
     */
    addIngredient(id, name) {
        this.ingredients.push(new Ingredient(formatKey(id), name));
    }
}