const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const resetPassword = require('../../../../app/services/user/reset.password');
const db = require('../../../../lib/database');


chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test for User Reset Password Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should fail to Get User. DB Error', async() => {
        const data = 'akin@gmail.com';
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        expect(resetPassword(data)).to.be.rejectedWith(Error, 'Unknown Error');
    });


    it('Should fail to Get User. No User Found', async() => {
        const data = 'akin@gmail.com';
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        expect(resetPassword(data)).to.be.rejectedWith(Error, 'Could not find a user with that email');
    });


    it('Should fail to Get User. User is not verified.', async() => {
        const data = 'akin@gmail.com';
        const user = {
            is_verified: false
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        expect(resetPassword(data)).to.be.rejectedWith(Error, 'Request Forbidden');
    });


    it('Should Get User.', async() => {
        const data = 'akin@gmail.com';
        const user = {
            is_verified: true
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await resetPassword(data);
        assert(response === true);
    });
});
