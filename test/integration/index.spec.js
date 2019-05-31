const app = require('../../index');

const assert = require('assert');
const request = require('supertest');

describe('Integration test', () => {
    it('Test Default route', done => {
        request(app)
            .get('/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.message, 'Service');
                done();
            });
    });
});
