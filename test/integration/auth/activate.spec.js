const assert = require('assert');
const request = require('supertest');
const app = require('../../../index');


describe('Activate Account Integration test', () => {
    it('Test Activate Account route to fail. Wrong code', done => {
        request(app)
            .get('/v1/auth/activate/b4156fe33f98668e7hjdjbhdg')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });
});
