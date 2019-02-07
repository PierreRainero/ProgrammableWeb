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
     * @param {string} nutrigrade Nutrition grade (A, B, C, D, E)
     * @param {string} novaGroup Nova group (1, 2, 3, 4) : -1 for unknow
     */
    constructor(code, name, nutrigrade, novaGroup) {
        this.code = code;
        this.name = !name ? "" : name;
        this.score = -1;
        this.nutrigrade = !nutrigrade ? "" : nutrigrade.toUpperCase();
        this.novaGroup = !novaGroup ? -1 : parseInt(novaGroup);
        this.ingredients = new Array();
        this.allergens = new Array();
        this.additives = new Array();
    }

    /**
     * Add an ingredient to the product
     * @param {string} id identifier to format for the ingredient
     * @param {string} name ingredient name
     */
    addIngredient(id, name) {
        this.ingredients.push(new Ingredient(formatKey(id), name));
    }

    /**
     * Add an allergen to the product
     * @param {string} allergenToAdd allergen name
     */
    addAllergen(allergenToAdd){
        const formatAllergen = formatKey(allergenToAdd);
        if (this.allergens.indexOf(formatAllergen) === -1) {
            this.allergens.push(formatAllergen);
        }
    }

    /**
     * Add an additive to the product
     * @param {string} additiveToAdd additive name (id)
     */
    addAdditive(additiveToAdd){
        const formatAdditive = formatKey(additiveToAdd);
        if (this.additives.indexOf(formatAdditive) === -1) {
            this.additives.push(formatAdditive);
        }
    }

    /**
     * Calculate product score
     */
    calculateScore(){
        let scoreCalcul = this.novaGroup!==-1? (this.novaGroup-1)*5 : 20;
        switch(this.nutrigrade.toLocaleUpperCase()){
            case 'A':
                scoreCalcul += -5;
                break;

            case 'B':
                scoreCalcul += 0;
                break;

            case 'C':
                scoreCalcul += 5;
                break;
            
            case 'D':
                scoreCalcul += 15;
                break;   
            
            default:
                scoreCalcul += 15;
                break;
        }

        scoreCalcul += this.additives.length*3;
        scoreCalcul = 100-scoreCalcul;

        this.score = scoreCalcul>0 ? scoreCalcul : 0;
    }
}