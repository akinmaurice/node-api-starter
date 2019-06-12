const sinon = require('sinon');
const assert = require('assert');

const loggerInit = require('../../../config/logger');


let sandbox;


describe('Unit Test for Logger', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Test For Logger Dev environment ', async() => {
        const logger = loggerInit('development');
        assert(logger !== null);
    });

    it('Test For Logger Test environment ', async() => {
        const logger = loggerInit('test');
        assert(logger !== null);
    });

    it('Test For Logger Prod environment ', async() => {
        const logger = loggerInit('production');
        assert(logger !== null);
    });

    it('Test For Logger Staging environment ', async() => {
        const logger = loggerInit('staging');
        assert(logger !== null);
    });
});
