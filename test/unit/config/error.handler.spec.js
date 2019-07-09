const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const errorHandler = require('../../../config/error.handler');


chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox;


describe('Unit Test for Error Handler', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Test Error Handler to fail. No error name ', async() => {
        expect(errorHandler(null, 'development')).to.be.rejectedWith(Error, 'Provide a valid error name');
    });

    it('Test Error Handler to pass', async() => {
        const response = await errorHandler('Error name', 'development');
        assert(response === true);
    });
});
