const mongoose = require('./database').mongoose;
const db = require('./database').db;
const middleware = require('../products/middleware.js');

const recipesSchema = mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, ref: 'france' }],
    comments: [{ body: { type: String, required: true }, author: { type: String }, created_at: { type: Date, required: true } }],
    author: { type: String, required: false }
}, {
        timestamps: true,
        strict: true
    }
);

let recipesModel = db.model(
    'recipes',
    recipesSchema,
    'recipes'
);

const findAll = (successCallBack, errorCallback) => {
    recipesModel.find({}).populate({ path: 'ingredients', model: 'france' }).exec((err, result) => {
        if (err) {
            return errorCallback(err);
        }

        const recipes = [];
        for (let recipe of result) {
            const products = new Array();
            for (const product of recipe.ingredients) {
                products.push(middleware.parseProduct(product.toJSON()));
            }
            recipes.push({ _id: recipe._id, name: recipe.name, comments: recipe.comments, author: recipe.author, ingredients: products });
        }
        return successCallBack(recipes);
    })
}

const findAllComments = (recipeId, successCallBack, errorCallback) => {
    recipesModel.findById(new mongoose.mongo.ObjectId(recipeId)).exec((err, result) => {
        if (err) {
            return errorCallback(err);
        }
        if(result !== null && result.comments) {
            if(!result.comments.length) {
                return successCallBack([]);
            }
            return successCallBack(result.comments);
        }
        return errorCallback({message: 'No existing recipe for this id.'});
    });
}

const create = (name, ingredients, author, successCallBack, errorCallback) => {
    let recipe = new recipesModel({
        name: name,
        ingredients: ingredients,
        author: author
    })

    recipe
        .save()
        .then(recipe => {
            recipe.populate({ path: 'ingredients', model: 'france' }, function (err) {
                const products = new Array();
                for (const product of recipe.ingredients) {
                    products.push(middleware.parseProduct(product));
                }
                return successCallBack({ _id: recipe._id, name: recipe.name, comments: recipe.comments, author: recipe.author, ingredients: products });
            });
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