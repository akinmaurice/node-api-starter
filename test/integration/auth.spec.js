const app = require('../../index');

const assert = require('assert');
const request = require('supertest');

describe('Auth Integration test', () => {
    it('Test Register route to fail', done => {
        request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
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
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.message, 'Login successful');
                done();
            });
    });
});
