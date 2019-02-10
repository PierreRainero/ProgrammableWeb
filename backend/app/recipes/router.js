/**
 * REST API for Recipes
 * /recipes
 *      - GET : Return "all" recipes
 *      - POST : Create a new recipe
 */

const recipesDb = require('../database/recipes.js');
let router = require('express').Router();

/**
 * Create a new recipe using the user parameters
 * @param {express.Request} req Express HTTP request containing recipe parameters as body parameter
 * @param {express.Response} res Express HTTP response
 */
const createRecipe = async (req, res) => {
    const bodyParameters = req.body;

    if (bodyParameters !== undefined) {

        if (!bodyParameters.name || bodyParameters.name === '') {
            res.status(422).send("Recipe name is missing.");
            return;
        }

        if (!bodyParameters.ingredients || bodyParameters.ingredients.length < 2) {
            res.status(422).send("Recipe ingredients are missing (need at least two ingredients).");
            return;
        }
        
        recipesDb.create(
            bodyParameters.name,
            bodyParameters.ingredients,
            bodyParameters.author,
            (recipeCreated) => {
                res.status(200).send(recipeCreated.toJSON());
            },
            (error) => {
                console.log("Error: " + error.message);
                res.status(500).send(error.message);
            }
        );

    }
}

/**
 * Get all recipes.
 * @param {express.Request} req Express HTTP request
 * @param {express.Response} res Express HTTP response
 */
const getAllRecipes = async (req, res) => {
    recipesDb.findAll(
        (recipesFound) => {
            const recipes = new Array();
            for(const recipe of recipesFound){
                recipes.push(recipe.toJSON());
            }
            res.status(200).send(recipes);
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        }
    );
}

// ROUTES :
router.post('', createRecipe);
router.get('', getAllRecipes);

module.exports = router;