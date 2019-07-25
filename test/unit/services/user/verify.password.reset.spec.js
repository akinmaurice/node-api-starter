const sinon = require('sinon');
const assert = require('assert');
const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const verifyPasswordReset = require('../../../../app/services/user/verify.password.reset');
const db = require('../../../../lib/database');
const redisClient = require('../../../../lib/redis');


chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test for Verify Password Reset Token Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('Should fail to Activate User. Invalid Token', async() => {
        const arg = 'Akin';
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(null));
        await expect(verifyPasswordReset(arg)).to.be.rejected;
    });


    it('Should fail to Verify Token. Token Expired', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: '2019-06-06'
        };
        data = JSON.stringify(data);
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        await expect(verifyPasswordReset(arg)).to.be.rejected;
    });


    it('Should Verify Token.', async() => {
        const arg = 'Akin';
        let data = {
            user_id: 'user-12345',
            created_at: moment()
        };
        data = JSON.stringify(data);
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        const response = await verifyPasswordReset(arg);
        assert(response === true);
    });
});
