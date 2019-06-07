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
            .expect(201)
            .end((err, res) => {
                assert.equal(res.statusCode, 201);
                assert.equal(res.body.message, 'Successfully registered user account');
                done();
            });
    });
});
