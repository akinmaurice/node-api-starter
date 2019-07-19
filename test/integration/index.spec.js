const assert = require('assert');
const request = require('supertest');
const app = require('../../index');

describe('Default Route Integration test', () => {
    it('Test Default route', done => {
        request(app)
            .get('/v1/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.data, 'Service');
                done();
            });
    });


    it('Test Unknown route', done => {
        request(app)
            .get('/v1/unknown')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                assert.equal(res.body.message, 'Resource Not Found');
                done();
            });
    });
});
