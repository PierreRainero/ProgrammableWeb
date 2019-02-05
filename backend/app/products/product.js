/**
 * Class representing a product
 */
module.exports = class Product {

    /**
     * Normal constructor
     * @param {*} code Scan code
     * @param {*} name French product name
     */
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}