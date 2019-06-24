const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const assert = require('assert');


const loginUser = rewire('../../../../app/controllers/auth/login.js');

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
        assert(response !== null);
    });
});
