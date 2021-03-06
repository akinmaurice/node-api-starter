const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const resendActivationCode = require('../../../../app/services/user/resend.activation');
const db = require('../../../../lib/database');


chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test for User Resend Activation Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should fail to Get User. DB Error', async() => {
        const data = 'akin@gmail.com';
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        await expect(resendActivationCode(data)).to.be.rejected;
    });


    it('Should fail to Get User. No User Found', async() => {
        const data = 'akin@gmail.com';
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        await expect(resendActivationCode(data)).to.be.rejected;
    });


    it('Should fail to Get User. User is verified already', async() => {
        const data = 'akin@gmail.com';
        const user = {
            is_verified: true
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        await expect(resendActivationCode(data)).to.be.rejected;
    });


    it('Should Get User.', async() => {
        const data = 'akin@gmail.com';
        const user = {
            is_verified: false,
            email: 'test@gmail.com'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await resendActivationCode(data);
        assert(response === true);
    });
});
