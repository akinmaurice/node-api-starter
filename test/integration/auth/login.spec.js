
const assert = require('assert');
const request = require('supertest');
const faker = require('faker');
const app = require('../../../index');


describe('Login Integration tests', () => {

    const user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'Johndoetest23Password',
        confirm_password: 'Johndoetest23Password'
    };


    const loginUser = {
        username: 'test@gmail.com',
        password: 'testPassword'
    };


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


    it('Test Login route to fail. No Request Body', done => {
        request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Login route to fail. No User with that Email or Username', done => {
        request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                username: faker.internet.email(),
                password: 'Johndoetest23Passwo'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Login route to fail. Account isn\'t activated yet', done => {
        request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Login route to pass', done => {
        request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.data.message, 'Login successful');
                done();
            });
    });
});
