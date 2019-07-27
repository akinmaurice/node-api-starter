const assert = require('assert');
const request = require('supertest');
const app = require('../../../index');


let token = '';

describe('Update Password Integration test', () => {
    const loginUser = {
        username: 'test@gmail.com',
        password: 'testPassword'
    };

    it('Test Login route to pass', done => {
        request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                token = res.body.data.data.access_token;
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.data.message, 'Login successful');
                done();
            });
    });


    it('Test Update Password to fail. Invalid Token', done => {
        request(app)
            .put('/v1/user/password')
            .set('Content-Type', 'application/json')
            .set('authorization', 'RandomTokenaccess$45463464343')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done();
            });
    });


    it('Test Update Password to fail. No request body', done => {
        request(app)
            .put('/v1/user/password')
            .set('Content-Type', 'application/json')
            .set('authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Update Password to fail. Wrong Old Password', done => {
        request(app)
            .put('/v1/user/password')
            .set('Content-Type', 'application/json')
            .set('authorization', token)
            .send({
                old_password: 'WrongOldPasswordTest',
                new_password: 'NewPasswordTEster',
                confirm_password: 'NewPasswordTEster'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });
});
