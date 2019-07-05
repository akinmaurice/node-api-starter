const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const login = require('../../../../app/modules/user/login');
const db = require('../../../../lib/database');


chai.use(chaiAsPromised);
const should = chai.should();
const { expect } = chai;
let sandbox;


describe('Unit Test for User Login Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should fail to login User. DB Error', async() => {
        const arg = 'Akin';
        const password = 'Johndoetest23Password';
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        expect(login(arg, password)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should fail to login User. No User with Name/Email', async() => {
        const arg = 'Akin';
        const password = 'Johndoetest23Password';
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        expect(login(arg, password)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should fail to login User. Invalid Password', async() => {
        const arg = 'Akin';
        const password = 'Johndoetest23Password';
        const user = {
            id: 12345,
            is_verified: false,
            username: 'Akin',
            email: 'akin@gmail.com',
            salt: '$2b$10$V1bxiZUH50OMv',
            hash: '$2b$10$V1bxiZUH50OMvVQJHadKwuLfClwC.ne'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        expect(login(arg, password)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should fail to login User. User account is not verified', async() => {
        const arg = 'Akin';
        const password = 'Johndoetest23Password';
        const user = {
            id: 12345,
            is_verified: false,
            username: 'Akin',
            email: 'akin@gmail.com',
            salt: '$2b$10$V1bxiZUH50OMvVQJHadKwu',
            hash: '$2b$10$V1bxiZUH50OMvVQJHadKwuLfClwC.neL00jdiRROMWd4RFziQWEN2'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        expect(login(arg, password)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should login User.', async() => {
        const arg = 'Akin';
        const password = 'Johndoetest23Password';
        const user = {
            id: 12345,
            is_verified: true,
            username: 'Akin',
            email: 'akin@gmail.com',
            salt: '$2b$10$V1bxiZUH50OMvVQJHadKwu',
            hash: '$2b$10$V1bxiZUH50OMvVQJHadKwuLfClwC.neL00jdiRROMWd4RFziQWEN2'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await login(arg, password);
        assert(response !== null);
    });
});
