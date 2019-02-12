/**
 * Class representing a recipe
 */
class Recipe {

    /**
     * Normal constructor
     * @param {string} id Identifier of the recipe
     * @param {string} name Recipe name
     * @param {string} author Name of the user who posted the recipe
     * @param {string} ingredients List of products code used by the recipe
     * @param {array} comments Array of comments
     * @param {date} createdAt Creation date
     * @param {date} updatedAt Last modification date
     */
    constructor(id, name, author, ingredients, comments, createdAt, updatedAt) {
        this.id = id
        this.name = name;
        this.author = author;
        this.ingredients = ingredients;
        this.comments = comments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Recipe;