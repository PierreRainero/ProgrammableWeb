const mongoose = require('./database').mongoose;
const db = require('./database').db;

const recipesSchema = mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [],
    comments: [{ body: { type: String, required: true }, author: { type: String }, created_at: { type: Date, required: true } }],
    author: { type: String, required: false }
}, {
        timestamps: true,
        strict: true
    });

let recipesModel = db.model(
    'recipes',
    recipesSchema,
    'recipes'
);

const findAll = (successCallBack, errorCallback) => {
    recipesModel.find({}).exec((err, result) => {
        if (err) {
            return errorCallback(err);
        }
        successCallBack(result);
    })
}

const findAllComments = (recipeId, successCallBack, errorCallback) => {
    recipesModel.findOne({ _id: recipeId }).exec((err, result) => {
        if (err) {
            return errorCallback(err);
        }
        if (result === null || result.comments === null || !result.comments.length) {
            return successCallBack([]);
        }
        return successCallBack(result.comments);
    });
}

const create = (name, ingredients, author, successCallBack, errorCallback) => {
    let recipe = new recipesModel({
        name: name,
        ingredients: ingredients,
        author: author
    })

    recipe.save()
        .then(recipe => {
            return successCallBack(recipe);
        })
        .catch(err => {
            return errorCallback(err);
        })
}

const createComment = (recipeId, body, author, successCallBack, errorCallback) => {
    var commentObj = { "body": body, "author": author, "created_at": new Date() };

    recipesModel.findOneAndUpdate(
        { _id: recipeId },
        { $push: { comments: commentObj } },
        { new: true },
        function (err, recipe) {
            if (err) {
                return errorCallback(err);
            }
            return successCallBack(recipe.comments);
        }
    );
}

exports.findAll = findAll;
exports.findAllComments = findAllComments;
exports.create = create;
exports.createComment = createComment;