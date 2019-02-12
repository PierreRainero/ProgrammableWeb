const request = require('supertest')
const app = require('../../app')
const expect = require('expect')

const mongoose = require('../../app/database/database').mongoose;
const db = require('../../app/database/database').db;

describe('API - Recipes', function () {

    beforeEach(function (done) {
        done();
    });

    describe('GET /recipes', function () {
        it('should return a json object', function (done) {
            request(app)
                .get('/api/recipes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should return a list of 20 elements (at most)', function (done) {
            var recipes = mongoose.model('recipes');
            const oblRecipesCount = recipes.count();
            request(app)
                .get('/api/recipes')
                .set('Accept', 'application/json')
                .send()
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.length).toBeLessThanOrEqual(20);
                    return done();
                });
        });
    });

    describe('GET /recipes/:recipeId/comments', function () {
        it('should return a json object', function (done) {
            request(app)
                .get('/api/recipes/5c60055c6196b85bfba02cdd/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should respond an error', function (done) {
            request(app)
                .get('/api/recipes/5c9067a3516101c1efe7f137/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /text/)
                .expect(500)
                .expect('No existing recipe for this id.') // expecting content value
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
});