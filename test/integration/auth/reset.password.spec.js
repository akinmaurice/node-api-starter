
const assert = require('assert');
const request = require('supertest');
const faker = require('faker');
const app = require('../../../index');


describe('Reset and Verify Password Reset Integration test', () => {
    const user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'Johndoetest23Password',
        confirm_password: 'Johndoetest23Password'
    };


    const loginUser = {
        username: 'zaheer@gmail.com',
        password: 'jfjfjfjf'
    };


    it('Register User to test reset password route with', done => {
        request(app)
            .post('/v1/auth/register')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 201);
                assert.equal(res.body.data.message, 'Successfully registered user account');
                done();
            });
    });


    it('Test Reset Password To Fail. No User with that Email', done => {
        request(app)
            .post('/v1/auth/password/reset')
            .set('Content-Type', 'application/json')
            .send({
                email: 'random@gmail.com'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.message, 'Could not find a user with that email');
                done();
            });
    });


    it('Test Reset Password To Fail. User account not activated yet', done => {
        request(app)
            .post('/v1/auth/password/reset')
            .set('Content-Type', 'application/json')
            .send({
                email: user.email
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.message, 'User account is not activated yet');
                done();
            });
    });


    it('Test Reset Password To Pass.', done => {
        request(app)
            .post('/v1/auth/password/reset')
            .set('Content-Type', 'application/json')
            .send({
                email: loginUser.username
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.data.message, 'Reset Password successful');
                done();
            });
    });


    it('Test Verify Reset Password To Fail. No Token Provided', done => {
        request(app)
            .get('/v1/auth/password/reset')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.message, 'Invalid Token Provided');
                done();
            });
    });


    it('Test Verify Reset Password To Fail.Wrong Token Provided', done => {
        request(app)
            .get('/v1/auth/password/reset?token=jdjdhjdhdhd')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.message, 'Invalid Token Provided');
                done();
            });
    });
});
