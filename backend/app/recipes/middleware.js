const middleware = require('../products/middleware.js');

/**
 * Create a Recipe by parsing its ingredients. 
 * @param {Object} recipeJson json object
 * @return {Product} product parsed
 */
const parseRecipe = (recipe) => {
    const products = new Array();
    for (const product of recipe.ingredients) {
        products.push(middleware.parseProduct(product));
    }
    return { _id: recipe._id, name: recipe.name, comments: recipe.comments, author: recipe.author, ingredients: products, description: recipe.description, pictureUrl: recipe.pictureUrl, createdAt: recipe.createdAt, updatedAt: recipe.updatedAt };
}

exports.parseRecipe = parseRecipe;