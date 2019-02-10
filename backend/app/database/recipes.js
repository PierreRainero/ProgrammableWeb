const mongoose = require('./database').mongoose;
const db = require('./database').db;

const recipesSchema = mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [],
    comments: [],
    author: { type: String, required: false },
    created_at: { type: Date }
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

const create = (name, ingredients, author, successCallBack, errorCallback) => {

    let recipe = new recipesModel({
        name: name,
        ingredients: ingredients,
        author: author
    })

    recipe.save()
        .then(doc => {
            return successCallBack(doc);
        })
        .catch(err => {
            return errorCallback(err);
        })
}

exports.findAll = findAll;
exports.create = create;