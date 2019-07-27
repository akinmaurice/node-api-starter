
const assert = require('assert');
const request = require('supertest');
const faker = require('faker');
const app = require('../../../index');


describe('Registration Integration test', () => {
    const user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'Johndoetest23Password',
        confirm_password: 'Johndoetest23Password'
    };


    it('Test Register route to fail. No Request Body', done => {
        request(app)
            .post('/v1/auth/register')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Register route to pass', done => {
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
});
