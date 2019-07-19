
const assert = require('assert');
const request = require('supertest');
const faker = require('faker');
const app = require('../../index');


let token = '';

describe('Auth Integration test', () => {
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
                token = res.body.data.data.access_token;
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.data.message, 'Login successful');
                done();
            });
    });


    it('Test Activate Account route to fail. Wrong code', done => {
        request(app)
            .get('/v1/auth/activate/b4156fe33f98668e7hjdjbhdg')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
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


    it('Test Change Reset Password To Fail.No Request Body', done => {
        request(app)
            .put('/v1/auth/password/reset?token=jdjdhjdhdhd')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Change Reset Password To Fail.No Token Provided', done => {
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


    it('Test Change Reset Password To Fail.Wrong Token Provided', done => {
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


    it('Test protected route to fail. No Auth Token Provided', done => {
        request(app)
            .get('/v1/user/protected')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done();
            });
    });


    it('Test protected route to fail. Invalid Token', done => {
        request(app)
            .get('/v1/user/protected')
            .set('Content-Type', 'application/json')
            .set('authorization', 'RandomTokenaccess$45463464343')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('Test protected route to pass', done => {
        request(app)
            .get('/v1/user/protected')
            .set('Content-Type', 'application/json')
            .set('authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.data, 'Protected Route Service');
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
