/**
 * REST API for Recipes
 * /recipes
 *      - GET : Return "all" recipes
 *      - POST : Create a new recipe
 * /recipes/{recipeId}/comments
 *      - GET : Return all comments from one recipe (selected by {recipeId})
 *      - POST : Create a new comment about a recipe (selected by {recipeId})
 */

const recipesDb = require('../database/recipes.js');
let router = require('express').Router();

/**
 * Get all recipes.
 * @param {express.Request} req Express HTTP request
 * @param {express.Response} res Express HTTP response
 */
const getAllRecipes = async (req, res) => {
    recipesDb.findAll(
        (recipesFound) => {
            res.status(200).send(recipesFound);
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        }
    );
}

/**
 * Get all comments about a precise recipe.
 * @param {express.Request} req Express HTTP request containing recipe id (params)
 * @param {express.Response} res Express HTTP response
 */
const getAllComments = async (req, res) => {
    if (!req.params.recipeId || req.params.recipeId === '') {
        res.status(422).send("Recipe id is missing.");
        return;
    }

    recipesDb.findAllComments(
        req.params.recipeId,
        (commentsFound) => {
            const comments = new Array();
            for (const comment of commentsFound) {
                comments.push(comment.toJSON());
            }
            res.status(200).send(comments);
        },
        (error) => {
            console.log("Error: " + error.message);
            res.status(500).send(error.message);
        }
    );
}

/**
 * Create a new recipe using the user parameters
 * @param {express.Request} req Express HTTP request containing recipe parameters (body)
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
                res.status(200).send(recipeCreated);
            },
            (error) => {
                console.log("Error: " + error.message);
                res.status(500).send(error.message);
            }
        );

    }
}

/**
 * Create a new comment about an existing recipe. 
 * @param {express.Request} req Express HTTP request containing comment parameters (body), recipe id (params)
 * @param {express.Response} res Express HTTP response
 */
const createComment = async (req, res) => {
    if (!req.params.recipeId || req.params.recipeId === '') {
        res.status(422).send("Recipe id is missing.");
        return;
    }

    const bodyParameters = req.body;
    if (bodyParameters !== undefined) {
        if (!bodyParameters.body || bodyParameters.body === '') {
            res.status(422).send("Comment body is missing.");
            return;
        }

        recipesDb.createComment(
            req.params.recipeId,
            bodyParameters.body,
            bodyParameters.author,
            (commentsFound) => {
                const comments = new Array();
                for (const comment of commentsFound) {
                    comments.push(comment.toJSON());
                }
                res.status(200).send(comments);
            },
            (error) => {
                console.log("Error: " + error.message);
                res.status(500).send(error.message);
            }
        );
    }
}

// ROUTES :
router.get('', getAllRecipes);
router.post('', createRecipe);
router.get('/:recipeId/comments', getAllComments);
router.post('/:recipeId/comments', createComment);

module.exports = router;