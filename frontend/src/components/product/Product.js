/**
 * Class representing a product
 */
class Product {
    /**
     * Normal constructor
     * @param {string} code Scan code
     * @param {string} name Product name
     * @param {number} score Score qualité (between 0 and 100)
     * @param {string} nutrigrade Nutrition grade (A, B, C, D, E)
     * @param {string} novaGroup Nova group (1, 2, 3, 4) : -1 for unknow
     * @param {*} ingredients Array of ingredients
     * @param {*} allergens Array of allergens
     * @param {*} additives  Array of additives
     */
    constructor(code, name, score, nutrigrade, novaGroup, ingredients, allergens, additives) {
        this.code = code;
        this.name = name;
        this.score = score;
        this.nutrigrade = nutrigrade;
        this.novaGroup = novaGroup;
        this.ingredients = ingredients;
        this.allergens = allergens;
        this.additives = additives;
        this.img = '';
    }

    /**
     * Add an image to a product
     * @param {string} url address of the product image
     */
    addImg(url){
        this.img = url;
    }
}

export default Product;