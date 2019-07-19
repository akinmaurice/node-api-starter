const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');


const registerUser = rewire('../../../../app/api/v1/controllers/auth/register.js');

chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test to create a user', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Validation check should fail for request body', async() => {
        const body = {
        };
        const checkRequestBody = registerUser.__get__('checkRequestBody');
        await expect(checkRequestBody(body)).to.be.rejected;
    });


    it('Validation check for Request Body should pass', async() => {
        const body = {
            username: 'Akin',
            email: 'akin@gmail.com',
            password: 'Johndoetest23Password',
            confirm_password: 'Johndoetest23Password'
        };
        const checkRequestBody = registerUser.__get__('checkRequestBody');
        const response = await checkRequestBody(body);
        assert(response !== null);
    });
});
