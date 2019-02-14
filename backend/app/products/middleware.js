const Product = require('./product.js');

/**
 * Generate a Product object from a json object from the database
 * @param {Object} productJson json object
 * @return {Product} product parsed
 */
const parseProduct = (productJson) => {
    const product = new Product(productJson.code, productJson.product_name, productJson.nutrition_grades, productJson.nova_group);
    
    const ingredients = productJson.ingredients;
    if (ingredients && ingredients.length > 0) {
        for (const ingredient of ingredients) {
            product.addIngredient(ingredient.id, ingredient.text);
        }
    }

    if (productJson.allergens_from_ingredients) {
        const allergens = productJson.allergens_from_ingredients.split(', ');
        if (allergens.length > 0) {
            for (const allergen of allergens) {
                product.addAllergen(allergen);
            }
        }
    }

    const additives = productJson.additives_prev_original_tags;
    if (additives && additives.length > 0) {
        for (const additive of additives) {
            product.addAdditive(additive);
        }
    }

    product.calculateScore();
    return product;
}

exports.parseProduct = parseProduct;