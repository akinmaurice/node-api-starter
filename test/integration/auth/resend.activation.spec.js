const assert = require('assert');
const request = require('supertest');
const faker = require('faker');
const app = require('../../../index');


describe('Auth Integration test', () => {
    const user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'Johndoetest23Password',
        confirm_password: 'Johndoetest23Password'
    };


    it('Register User to test resend activation with route to pass', done => {
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


    it('Test Resend Activation route to fail', done => {
        request(app)
            .post('/v1/auth/activate/resend')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Resend Activation route to pass', done => {
        request(app)
            .post('/v1/auth/activate/resend')
            .set('Content-Type', 'application/json')
            .send({
                email: user.email
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.data.message, 'Activation code sent');
                done();
            });
    });
});
