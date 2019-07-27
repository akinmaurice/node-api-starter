
const assert = require('assert');
const request = require('supertest');
const app = require('../../../index');


describe('Change Password Integration test', () => {
    it('Test Change Password To Fail.No Request Body', done => {
        request(app)
            .put('/v1/auth/password/reset?token=jdjdhjdhdhd')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Change Password To Fail.No Token Provided', done => {
        request(app)
            .put('/v1/auth/password/reset')
            .set('Content-Type', 'application/json')
            .send({
                password: 'RunningAwayManJd',
                confirm_password: 'RunningAwayManJd'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.message, 'Invalid Token Provided');
                done();
            });
    });


    it('Test Change Password To Fail.Wrong Token Provided', done => {
        request(app)
            .put('/v1/auth/password/reset?token=jdjdhjdhdhd')
            .set('Content-Type', 'application/json')
            .send({
                password: 'RunningAwayManJd',
                confirm_password: 'RunningAwayManJd'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.message, 'Invalid Token Provided');
                done();
            });
    });
});
