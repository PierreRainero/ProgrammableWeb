import Product from '../product/Product';
import Comment from './Comment';

/**
 * Class representing a recipe
 */
class Recipe {
    /**
     * Normal constructor
     * @param {string} id Identifier of the recipe
     * @param {string} name Recipe name
     * @param {string} author Name of the user who posted the recipe
     * @param {string} img Url of the recipe image
     * @param {string} ingredients List of products code used by the recipe
     * @param {array} comments Array of comments
     * @param {date} createdAt Creation date
     * @param {date} updatedAt Last modification date
     */
    constructor(id, name, author, img, ingredients, comments, createdAt, updatedAt) {
        this.id = id
        this.name = name;
        this.author = author;
        this.img = img;

        this.ingredients = [];
        for (const ingredient of ingredients) {
            this.ingredients.push(new Product(ingredient.code,
                ingredient.name,
                ingredient.score,
                ingredient.nutrigrade,
                ingredient.novaGroup,
                ingredient.ingredients,
                ingredient.allergens,
                ingredient.additives));
        }

        this.comments = [];
        for (const comment of comments) {
            this.comments.push(new Comment(comment._id, comment.author, comment.body, comment.created_at));
        }

        this.createdAt = this.formatDate(createdAt);
        this.updatedAt = this.formatDate(updatedAt);
    }

    /**
     * Convert a date to a string as dd/mm/YYYY
     * @param {string} dateToFormat date as string to format
     * @return {string} format date
     */
    formatDate(dateToFormat) {
        const date = new Date(dateToFormat);
        return `${date.getDate()}/${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}/${date.getUTCFullYear()}`;
    }

    /**
     * Convert a recip object to JSON understandable by the backend
     * @return {string} name, author and ingredients' code in a JSON string
     */
    toSupportedJSON() {
        const ingredients = [];
        for (const ingredient of ingredients) {
            ingredients.push(ingredient.code);
        }
        return JSON.stringify({ name: this.name, ingredients: ingredients, author: this.author, pictureUrl: this.img });
    }
}

export default Recipe;