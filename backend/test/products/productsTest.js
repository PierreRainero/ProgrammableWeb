const request = require('supertest')
const app = require('../../app')
const expect = require('expect')

const mongoose = require('../../app/database/database').mongoose;
const db = require('../../app/database/database').db;
const recipesSchema = require('../../app/database/recipes').schema;

var recipes = db.model(
    'recipes',
    recipesSchema,
    'recipes'
);

describe('API - Recipes', function () {

    beforeEach(function (done) {
        done();
    });

    describe('GET /products/:productId/recipes', function () {

        it('should return a json object', function (done) {
            request(app)
                .get('/api/products/0021200002021/recipes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);

        });
    });
});