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

    describe('GET /recipes', function () {

        it('should return a json object', function (done) {
            request(app)
                .get('/api/recipes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        describe('GET /recipes?page={pageNumber}&itemsPerPage={numberItemsPerPage}', function () {

            it('should return a list of 1 element', function (done) {
                request(app)
                    .get('/api/recipes?page=1&itemsPerPage=1')
                    .set('Accept', 'application/json')
                    .send()
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.length).toBe(1);
                        return done();
                    });
            });

            it('should return a list of 20 elements (at most)', function (done) {
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

        describe('GET /recipes/:recipeId', function () {
            /**
             * TODO: use database (create and delete a receipt for tests)
             */
            it('should return a json object with right name', function (done) {
                request(app)
                    .get('/api/recipes/5c60055c6196b85bfba02cdd')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.name).toBe('Cheese & Macaroni');
                        return done();
                    });
            });

        });

        describe('GET /recipes?name={recipetName}', function () {

            it('should return a json object', function (done) {
                request(app)
                    .get('/api/recipes?name=macaroni')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

        });

        describe('GET /recipes?name={recipetName}', function () {

            it('should return a list of 1 element', function (done) {
                request(app)
                    .get('/api/recipes?name=macaroni&page=1&itemsPerPage=1')
                    .set('Accept', 'application/json')
                    .send()
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.length).toBe(1);
                        return done();
                    });
            });

            it('should return a list of 20 elements (at most)', function (done) {
                request(app)
                    .get('/api/recipes?name=macaroni')
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
    });

    describe('POST /recipes', function () {

        data = {
            "name": "Cheese & Macaroni",
            "ingredients": ["20291174", "0064200116473"],
            "author": "Fabien"
        };

        it('should return an error : no parameters', function (done) {
            request(app)
                .post('/api/recipes')
                .set('Accept', 'application/json')
                .send({})
                .expect('Content-Type', /text/)
                .expect(422)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('should return an error : name missing', function (done) {
            request(app)
                .post('/api/recipes')
                .set('Accept', 'application/json')
                .send({ ingredients: ["20291174", "0064200116473"], author: "Fabien" })
                .expect('Content-Type', /text/)
                .expect(422)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).toBe("Recipe name is missing.");
                    return done();
                });
        });

        it('should return an error : ingredients missing', function (done) {
            request(app)
                .post('/api/recipes')
                .set('Accept', 'application/json')
                .send({ name: "Cheese & Macaroni", author: "Fabien" })
                .expect('Content-Type', /text/)
                .expect(422)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).toBe("Recipe ingredients are missing (need at least two ingredients).");
                    return done();
                });
        });

        it('should create a recipe', function (done) {
            request(app)
                .post('/api/recipes')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    recipes.findOneAndDelete({ _id: new mongoose.mongo.ObjectId(res.body._id) }).exec((err, res) => {
                        if (err) {
                            return done(err);
                        }
                    });
                    return done();
                });

        });

        it('should create a recipe with no author', function (done) {
            request(app)
                .post('/api/recipes')
                .set('Accept', 'application/json')
                .send({ name: "Cheese & Macaroni", ingredients: ["20291174", "0064200116473"] })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    recipes.findOneAndDelete({ _id: new mongoose.mongo.ObjectId(res.body._id) }).exec((err, res) => {
                        if (err) {
                            return done(err);
                        }
                    });
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

    describe('POST /recipes/:recipeId/comments', function () {
        const data = {
            "body": "Très bonne recette, je vais surement la proposer dans mon restaurant !",
            "author": "Philippe Etchebest"
        }

        /**
         * TODO: use database (create and delete a receipt for tests)
         */
        it('should return an error : no parameters', function (done) {

            request(app)
                .post('/api/recipes/5c60055c6196b85bfba02cdd/comments')
                .set('Accept', 'application/json')
                .send({})
                .expect('Content-Type', /text/)
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

        /**
         * TODO: use database (create and delete a receipt for tests)
         */
        it('should return an error : missing body', function (done) {

            request(app)
                .post('/api/recipes/5c60055c6196b85bfba02cdd/comments')
                .set('Accept', 'application/json')
                .send({ "author": "Philippe Etchebest" })
                .expect('Content-Type', /text/)
                .expect(422)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).toBe('Comment body is missing.');
                    done();
                });
        });

        it('should return an error : not an existing recipe', function (done) {
            request(app)
                .post('/api/recipes/5c9067a3516101c1efe7f137/comments')
                .set('Accept', 'application/json')
                .send(data)
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