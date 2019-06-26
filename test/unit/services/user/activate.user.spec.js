const sinon = require('sinon');
const assert = require('assert');
const moment = require('moment');
const chai = require('chai');

const activateUser = require('../../../../app/services/user/activate.user');
const db = require('../../../../lib/database');
const redisClient = require('../../../../lib/redis');


const should = chai.should();
const { expect } = chai;
let sandbox;


describe('Unit Test for Activate User Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('Should fail to Activate User. Invalid Token', async() => {
        const arg = 'Akin';
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(null));
        await expect(activateUser(arg)).to.be.rejected;
    });


    it('Should fail to Activate User. Token Expired', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: '2019-06-06'
        };
        data = JSON.stringify(data);
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        await expect(activateUser(arg)).to.be.rejected;
    });


    it('Should fail to Activate User. No User with id', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: moment()
        };
        data = JSON.stringify(data);
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        await expect(activateUser(arg)).to.be.rejected;
    });


    it('Should fail to Activate User. User is Verified Already', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: moment()
        };
        data = JSON.stringify(data);
        const user = {
            id: 'user-12345',
            is_verified: true
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        await expect(activateUser(arg)).to.be.rejected;
    });


    it('Should Activate User.', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: moment()
        };
        data = JSON.stringify(data);
        const user = {
            id: 'user-12345',
            is_verified: false
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        sandbox.stub(db, 'none').returns(Promise.resolve());
        sandbox.stub(redisClient, 'hdelAsync').returns(Promise.resolve());
        const response = await activateUser(arg);
        assert(response === true);
    });
});
