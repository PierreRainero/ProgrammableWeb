/**
 * Class representing a comment on a recipe
 */
class Comment {
    /**
     * Normal constructor
     * @param {string} id Identifier of the comment
     * @param {string} author Name of the user who posted the recipe 
     * @param {string} body Comment content
     * @param {date} createdAt Creation date
     */
    constructor(id, author, body, createdAt) {
        this.id = id
        this.author = author;
        this.body = body;
        this.createdAt = createdAt;
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
}

export default Comment;