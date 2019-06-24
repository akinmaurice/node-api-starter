const app = require('../../index');

const assert = require('assert');
const request = require('supertest');

let token = '';

describe('Auth Integration test', () => {
    it('Test Register route to fail. No Request Body', done => {
        request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('Test Register route to pass', done => {
        request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                username: 'Akin',
                email: 'akin@gmail.com',
                password: 'Johndoetest23Password',
                confirm_password: 'Johndoetest23Password',
                date_of_birth: '1991-06-29'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 201);
                assert.equal(res.body.message, 'Successfully registered user account');
                done();
            });
    });


    it('Test Login route to fail. No Request Body', done => {
        request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Login route to fail. No User with that Email or Username', done => {
        request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'ak@gmail.com',
                password: 'Johndoetest23Passwo'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Login route to Fail. Wrong Password', done => {
        request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'akin@gmail.com',
                password: 'Johndoetest23Passwo'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Login route to pass', done => {
        request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'akin@gmail.com',
                password: 'Johndoetest23Password'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                token = res.body.data.access_token;
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.message, 'Login successful');
                done();
            });
    });


    it('Test protected route to fail', done => {
        request(app)
            .get('/user/protected')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 403);
                done();
            });
    });


    it('Test protected route to pass', done => {
        request(app)
            .get('/user/protected')
            .set('Content-Type', 'application/json')
            .set('authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                token = res.body.access_token;
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.message, 'Protected Service Route');
                done();
            });
    });


    it('Test protected route to fail. Invalid Token', done => {
        request(app)
            .get('/user/protected')
            .set('Content-Type', 'application/json')
            .set('authorization', 'RandomTokenaccess$45463464343')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                token = res.body.access_token;
                assert.equal(res.statusCode, 403);
                done();
            });
    });
});
