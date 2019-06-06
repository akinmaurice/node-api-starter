const app = require('../../index');

const assert = require('assert');
const request = require('supertest');

describe('Auth Integration test', () => {
    it('Test Register route to fail', done => {
        request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.statusCode, 422);
                done();
            });
    });
});
