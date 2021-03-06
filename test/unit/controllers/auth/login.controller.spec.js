const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const assert = require('assert');


const loginUser = rewire('../../../../app/api/v1/controllers/auth/login.js');

chai.use(chaiAsPromised);
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
