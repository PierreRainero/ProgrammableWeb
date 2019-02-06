/**
 *  Class representing an ingredient
 */
module.exports = class Ingredient {
    /**
     * Normal constructor
     * @param {string} id Ingredient identifier
     * @param {string} name Ingredient name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}