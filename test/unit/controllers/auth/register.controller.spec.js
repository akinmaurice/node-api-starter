const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const assert = require('assert');

const db = require('../../../../lib/database');


const registerUser = rewire('../../../../app/controllers/auth/register.controller.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('Unit Test to create a user', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Validation check should fail for request body', async() => {
        const body = {
        };
        const checkRequestBody = registerUser.__get__('checkRequestBody');
        await expect(checkRequestBody(body)).to.be.rejected;
    });


    it('Validation check should pass', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        const checkRequestBody = registerUser.__get__('checkRequestBody');
        const response = await checkRequestBody(body);
        response.should.equal(true);
    });


    it('Verification for Username should fail as username exists', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        const result = {
            id: 1
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(result));
        const verifyUserName = registerUser.__get__('verifyUserName');
        await expect(verifyUserName(body)).to.be.rejected;
    });


    it('Verification for Username should fail. Db Error', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        const verifyUserName = registerUser.__get__('verifyUserName');
        await expect(verifyUserName(body)).to.be.rejected;
    });


    it('Verification for Username should pass as username does not exist', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        const verifyUserName = registerUser.__get__('verifyUserName');
        const response = await verifyUserName(body);
        response.should.equal(true);
    });


    it('Verification for User email should fail as email exists', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        const result = {
            id: 1
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(result));
        const verifyUserEmail = registerUser.__get__('verifyUserEmail');
        await expect(verifyUserEmail(body)).to.be.rejected;
    });


    it('Verification for User email should fail. Db Error', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        const verifyUserEmail = registerUser.__get__('verifyUserEmail');
        await expect(verifyUserEmail(body)).to.be.rejected;
    });


    it('Verification for User email should pass as email does not exist', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        const verifyUserEmail = registerUser.__get__('verifyUserEmail');
        const response = await verifyUserEmail(body);
        response.should.equal(true);
    });


    it('Should fail to hash Password. Bcrypt Error', async() => {
        sandbox.stub(db, 'none').returns(Promise.reject());
        const hashUserPassword = registerUser.__get__('hashUserPassword');
        await expect(hashUserPassword()).to.be.rejected;
    });


    it('Should hash password.', async() => {
        const password = 'Johndoetest23Password';
        sandbox.stub(db, 'none').returns(Promise.reject());
        const hashUserPassword = registerUser.__get__('hashUserPassword');
        const response = await hashUserPassword(password);
        assert(response.salt !== null);
        assert(response.hash !== null);
    });


    it('Should fail to save user. Db Error', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        const passwordData = {
            hash: 'fjhfghfghfghvfghvf',
            salt: 'kjfhjfjhfjhf'
        };
        sandbox.stub(db, 'none').returns(Promise.reject());
        const saveUser = registerUser.__get__('saveUser');
        await expect(saveUser(body, passwordData)).to.be.rejected;
    });


    it('Should save User', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password',
            date_of_birth: '1991-06-29'
        };
        const passwordData = {
            hash: 'fjhfghfghfghvfghvf',
            salt: 'kjfhjfjhfjhf'
        };
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const saveUser = registerUser.__get__('saveUser');
        const response = await saveUser(body, passwordData);
        response.should.equal(true);
    });
});
