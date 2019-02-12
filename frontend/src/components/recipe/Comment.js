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
}

export default Comment;