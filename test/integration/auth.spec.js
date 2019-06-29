
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
        confirm_password: 'Johndoetest23Password',
        date_of_birth: faker.date.between('1970-01-01', '2003-12-31')
    };

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
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    /*
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
    */

    it('Test Activate Account route to fail. Wrong code', done => {
        request(app)
            .get('/auth/activate/b4156fe33f98668e7hjdjbhdg')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });


    it('Test Resend Activation route to pass', done => {
        request(app)
            .post('/auth/activate/resend')
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


    it('Test protected route to fail. No Auth Token Provided', done => {
        request(app)
            .get('/user/protected')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done();
            });
    });


    /*
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
    */


    it('Test protected route to fail. Invalid Token', done => {
        request(app)
            .get('/user/protected')
            .set('Content-Type', 'application/json')
            .set('authorization', 'RandomTokenaccess$45463464343')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                token = res.body.access_token;
                assert.equal(res.statusCode, 401);
                done();
            });
    });
});
