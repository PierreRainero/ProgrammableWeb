const Location = require('./location.js');

/**
 * Class representing a store
 */
module.exports = class Store {

    /**
     * Normal constructor
     * @param {number} id Store id
     * @param {string} name Store name
     * @param {Location} location Store location
     */
    constructor(id, name, location) {
        this.id = id;
        this.name = !name ? "" : name;
        this.location = location;
    }

}