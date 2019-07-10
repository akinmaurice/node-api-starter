const sinon = require('sinon');
const assert = require('assert');
const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const Helpers = require('../../../../app/helpers');
const changePassword = require('../../../../app/services/user/change.password');
const db = require('../../../../lib/database');
const redisClient = require('../../../../lib/redis');


chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test for Change Password Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('Should fail to Verify. Invalid Token', async() => {
        const arg = {
            token: 'Akin',
            password: 'RandomStringPassword'
        };
        const passwordData = {
            hash: 'hashsshs',
            salt: 'saljfjfjfjf'
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(null));
        sandbox.stub(Helpers.Password, 'hashUserPassword').returns(Promise.resolve(passwordData));
        expect(changePassword(arg)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should fail to Verify Token. Token Expired', async() => {
        const arg = {
            token: 'Akin',
            password: 'RandomStringPassword'
        };
        let data = {
            user_id: 'user-12345',
            created_at: '2019-06-06'
        };
        data = JSON.stringify(data);
        const passwordData = {
            hash: 'hashsshs',
            salt: 'saljfjfjfjf'
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(Helpers.Password, 'hashUserPassword').returns(Promise.resolve(passwordData));
        expect(changePassword(arg)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should Verify Token and fail to Change Password.Db error', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: moment()
        };
        data = JSON.stringify(data);
        const passwordData = {
            hash: 'hashsshs',
            salt: 'saljfjfjfjf'
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(Helpers.Password, 'hashUserPassword').returns(Promise.resolve(passwordData));
        sandbox.stub(db, 'none').returns(Promise.reject());
        expect(changePassword(arg)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should Verify Token and Change Password.', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: moment()
        };
        data = JSON.stringify(data);
        const passwordData = {
            hash: 'hashsshs',
            salt: 'saljfjfjfjf'
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(Helpers.Password, 'hashUserPassword').returns(Promise.resolve(passwordData));
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const response = await changePassword(arg);
        assert(response === true);
    });
});
