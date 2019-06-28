const sinon = require('sinon');
const assert = require('assert');
const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const register = require('../../../../app/services/user/register');
const db = require('../../../../lib/database');


chai.use(chaiAsPromised);
const should = chai.should();
const { expect } = chai;
let sandbox;


describe('Unit Test for User Register Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should fail to Register User. DB Error', async() => {
        const data = {
            email: 'akin@gmail.com',
            username: 'Akin',
            password: 'Johndoetest23Password',
            date_of_birth: moment()
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        await expect(register(data)).to.be.rejected;
    });


    it('Should fail to Register User. User Exists Already', async() => {
        const data = {
            email: 'akin@gmail.com',
            username: 'Akin',
            password: 'Johndoetest23Password',
            date_of_birth: moment()
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve({}));
        await expect(register(data)).to.be.rejected;
    });


    it('Should Register User.', async() => {
        const data = {
            email: 'akin@gmail.com',
            username: 'Akin',
            password: 'Johndoetest23Password',
            date_of_birth: moment()
        };
        const user = {
            id: 'user-12345'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        sandbox.stub(db, 'one').returns(Promise.resolve(user));
        const response = await register(data);
        assert(response === true);
    });
});
