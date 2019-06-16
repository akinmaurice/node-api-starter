const sinon = require('sinon');
const assert = require('assert');

const generateToken = require('../../../app/helpers/generate.token');


let sandbox;


describe('Unit Test for Generate Token', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('Test generateToken to pass', async() => {
        const user = {
            id: 12345,
            name: 'Akin'
        };
        const response = await generateToken(user);
        assert(response !== null);
    });
});
