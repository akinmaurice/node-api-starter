const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const updatePassword = require('../../../../app/services/user/update.password');
const db = require('../../../../lib/database');
const Helpers = require('../../../../app/helpers');

chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test for User Update Password Service', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should fail to Get User. DB Error', async() => {
        const user_id = 'user-12345';
        const old_password = 'OldPassword';
        const new_password = 'NewPassword';
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());
        await expect(updatePassword(user_id, new_password, old_password)).to.be.rejected;
    });


    it('Should fail to Get User. No User Found', async() => {
        const user_id = 'user-12345';
        const old_password = 'OldPassword';
        const new_password = 'NewPassword';
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        await expect(updatePassword(user_id, new_password, old_password)).to.be.rejected;
    });


    it('Should fail to Get User. No User Found', async() => {
        const user_id = 'user-12345';
        const old_password = 'OldPassword';
        const new_password = 'NewPassword';
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        await expect(updatePassword(user_id, new_password, old_password)).to.be.rejected;
    });


    it('Should Get User and fail password validation', async() => {
        const user_id = 'user-12345';
        const old_password = 'OldPassword';
        const new_password = 'NewPassword';
        const user = {
            hash: 'Hshjbdhvgdvghdvhdggdd',
            salt: 'fhfghfvhgfvhgfghf'
        };
        sandbox.stub(Helpers.Password, 'verifyPassword').returns(Promise.resolve(false));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        await expect(updatePassword(user_id, new_password, old_password)).to.be.rejected;
    });


    it('Should update password', async() => {
        const user_id = 'user-12345';
        const old_password = 'OldPassword';
        const new_password = 'NewPassword';
        const user = {
            hash: 'Hshjbdhvgdvghdvhdggdd',
            salt: 'fhfghfvhgfvhgfghf'
        };
        sandbox.stub(Helpers.Password, 'verifyPassword').returns(Promise.resolve(true));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const response = await updatePassword(user_id, new_password, old_password);
        assert(response === true);
    });
});
