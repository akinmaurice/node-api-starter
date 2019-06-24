const sinon = require('sinon');
const assert = require('assert');
const moment = require('moment');
const chai = require('chai');

const register = require('../../../../app/services/user/register');
const db = require('../../../../lib/database');


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
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const response = await register(data);
        assert(response === true);
    });
});
