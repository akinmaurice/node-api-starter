const sinon = require('sinon');
const bcrypt = require('bcrypt');
const rewire = require('rewire');
const chai = require('chai');
const assert = require('assert');

const db = require('../../../../config/database');


const loginUser = rewire('../../../../app/controllers/auth/login.controller.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('Unit Test to login a user', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Validation check should fail for request body', async() => {
        const body = {
        };
        const checkRequestBody = loginUser.__get__('checkRequestBody');
        await expect(checkRequestBody(body)).to.be.rejected;
    });


    it('Validation check should pass', async() => {
        const body = {
            username: 'Akin',
            password: 'Johndoetest23Password'
        };
        const checkRequestBody = loginUser.__get__('checkRequestBody');
        const response = await checkRequestBody(body);
        response.should.equal(true);
    });


    it('Should fail to get user. Db Error', async() => {
        const username = 'Akin';
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        const getUserFromDB = loginUser.__get__('getUserFromDB');
        await expect(getUserFromDB(username)).to.be.rejected;
    });


    it('Should fail to get user. No Response', async() => {
        const username = 'Akin';
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        const getUserFromDB = loginUser.__get__('getUserFromDB');
        await expect(getUserFromDB(username)).to.be.rejected;
    });


    it('Should get user.', async() => {
        const username = 'Akin';
        const user = {
            id: 12345,
            username: 'Akin',
            hash: 'jdhdhdhdhd',
            salt: 'jsjshsh'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const getUserFromDB = loginUser.__get__('getUserFromDB');
        const response = await getUserFromDB(username);
        assert(response === user);
    });


    it('Should fail to confirm Password. Undefined password', async() => {
        const hash = 'jdhdhdhdhd';
        const salt = 'jsjshsh';
        const confirmPassword = loginUser.__get__('confirmPassword');
        await expect(confirmPassword(salt, hash)).to.be.rejected;
    });


    it('Should confirm Password.', async() => {
        const password = 'Johndoetest23Password';
        const hash = '$2b$10$WOoh9xpT8A5QoOvT.w04.uMGx90pSiHU0Lc.hzIP7LztUmI6wkxqm';
        const salt = '$2b$10$WOoh9xpT8A5QoOvT.w04.u';
        const confirmPassword = loginUser.__get__('confirmPassword');
        const response = await confirmPassword(password, salt, hash);
        assert(response === true);
    });
});
