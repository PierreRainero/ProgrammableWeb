const request = require('supertest')
const app = require('../../app')
const expect = require('expect')

describe('API - Products', function() {  

    beforeEach(function(done) {
        done();
    });

    describe('GET /products', function() {
        it('should return a list of products', function(done) {
            request(app)
                .get('/api/products')
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(text)
                  })
            done();
        });
    });


});