import HTTPService from '../../HTTPService';
import Recipe from './Recipe';

/**
 * Exposes all needed function to create and find recipes
 */
class RecipeService {
    /**
     * Get number of result for specific recipe name
     * @param {string} name name to search
     * @param {function} callback function to execute once the recipes are been found
     */
    static getNumberOfRecipesForName(name, callback) {
        const url = `${HTTPService.getBaseUrl()}/api/recipes?name=${name}&count=true`;
        fetch(url, { method: 'GET' })
            .then(response => {
                response.json().then((parsedResponse) => {
                    callback(parsedResponse.numberOfRecipes);
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
        });
    }

    /**
     * Search recipes from their names
     * @param {string} name name to search
     * @param {number} page page to display
     * @param {number} itemsPerPage number of elements per page
     * @param {function} callback function to execute once the recipes are been found
     */
    static searchRecipesByName(name, page, itemsPerPage, callback) {
        const url = `${HTTPService.getBaseUrl()}/api/recipes?name=${name}&page=${page}&itemsPerPage=${itemsPerPage}`;
        fetch(url, { method: 'GET' })
            .then(response => {
                response.json().then((parsedResponse) => {
                    const data = [];
                    for (const recipe of parsedResponse) {
                        data.push(new Recipe(recipe._id, recipe.name, recipe.author, recipe.pictureUrl, recipe.ingredients, recipe.comments, recipe.createdAt, recipe.updatedAt));
                    }
                    callback(data);
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
        });
    }

    /**
     * Create a new recipe
     * @param {Recipe} recipe recipe to add in the database
     * @param {function} callback function to execute once the recipe was created
     */
    static createARecipe(recipe, callback){
        const url = `${HTTPService.getBaseUrl()}/api/recipes`;
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: recipe.toSupportedJSON()
            })
            .then(response => {
                response.json().then((parsedResponse) => {
                    callback(parsedResponse);
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
        });
    }
}

export default RecipeService;  