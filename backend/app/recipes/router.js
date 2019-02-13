/**
 * REST API for Recipes
 * /recipes
 *      - GET   : Return "all" recipes
 *      - POST  : Create a new recipe
 * /recipes/{recipeId}/comments
 *      - GET   : Return all comments from one recipe (selected by {recipeId})
 *      - POST  : Create a new comment about a recipe (selected by {recipeId})
 */

const recipesDb = require('../database/recipes.js');
let router = require('express').Router();
const ise = require('../errors/internal-server-error');

/**
 * Get all recipes.
 * @param {express.Request} req Express HTTP request
 * @param {express.Response} res Express HTTP response
 */
const getAllRecipes = async (req, res) => {
    const queryParameters = req.query;

    if (queryParameters !== undefined) {
        if (queryParameters.name) {
            if (queryParameters.count) {
                getNumberRecipesByName(res, queryParameters.name);
            }else if (queryParameters.page && !isNaN(queryParameters.page) && queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage)) {
                getRecipesByName(res, queryParameters.name, parseInt(queryParameters.page), parseInt(queryParameters.itemsPerPage));
            } else {
                getRecipesByName(res, queryParameters.name, 1, 20);
            }
        } else {
            if (queryParameters.page && !isNaN(queryParameters.page) && queryParameters.itemsPerPage && !isNaN(queryParameters.itemsPerPage)) {
                getAllRecipesWithIndex(res, parseInt(queryParameters.page), parseInt(queryParameters.itemsPerPage));
            } else {
                getAllRecipesWithIndex(res, 1, 20);
            }
        }
    }
}

/**
 * Get a specific recipe using his id
 * @param {express.Request} req Express HTTP request containing recipe id as path parameter
 * @param {express.Response} res Express HTTP response containing corresponding recipe
 */
const getRecipeByCode = async (req, res) => {
    if (!req.params.recipeId || req.params.recipeId === '') {
        res.status(400).send("Recipe id is missing.");
        return;
    }

    recipesDb.findById(
        req.params.recipeId,
        (productFound) => {
            res.status(200).send(productFound);
        },
        (error) => {
            ise(res, error, 'There was an error finding the recipe.');
        }
    );
};

/**
 * Get the number of results for specific name
 * @param {express.Response} res Express HTTP response containing the number of result
 * @param {string} name String to match
 */
const getNumberRecipesByName = (res, name) => {
    recipesDb.getNumberOfRecipesForName(name,
        (result) => {
            res.status(200).send({numberOfRecipes: result});
        },
        (error) => {
            if (config.PRODUCTION){
                console.log("Error: " + error.message);
            }
            res.status(500).send(error.message);
    });
}

/**
 * Get all recipes (ordered by id) that match to the given string. 
 * @param {express.Response} res Express HTTP response containing corresponding products
 * @param {number} page page number to display (itemsPerPage*page)
 * @param {number} itemsPerPage number of products per diplayed by page
 * @param {string} name String to match
 */
const getRecipesByName = (res, name, page, itemsPerPage) => {
    recipesDb.findAllByName(
        name, page, itemsPerPage,
        (recipesFound) => {
            res.status(200).send(recipesFound);
        },
        (error) => {
            ise(res, error, error.message);
        }
    );
}

/**
 * Get all recipes (ordered by id) by group. Each group can be defined using query parameters.
 * @param {express.Response} res Express HTTP response containing corresponding products
 * @param {number} page page number to display (itemsPerPage*page)
 * @param {number} itemsPerPage number of products per diplayed by page
 */
const getAllRecipesWithIndex = (res, page, itemsPerPage) => {
    recipesDb.findAll(
        page, itemsPerPage,
        (recipesFound) => {
            res.status(200).send(recipesFound);
        },
        (error) => {
            ise(res, error, error.message);
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
                comments.push(comment);
            }
            res.status(200).send(comments);
        },
        (error) => {
            ise(res, error, error.message);
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
            bodyParameters.pictureUrl,
            (recipeCreated) => {
                res.status(200).send(recipeCreated);
            },
            (error) => {
                ise(res, error, error.message);
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
            (recipeUpdated) => {
                res.status(200).send(recipeUpdated);
            },
            (error) => {
                ise(res, error, error.message);
            }
        );
    }
}

// ROUTES :
router.get('', getAllRecipes);
router.post('', createRecipe);
router.get('/:recipeId', getRecipeByCode);
router.get('/:recipeId/comments', getAllComments);
router.post('/:recipeId/comments', createComment);

module.exports = router;