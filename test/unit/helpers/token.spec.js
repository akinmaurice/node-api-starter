const sinon = require('sinon');
const assert = require('assert');

const { generateToken, verifyToken } = require('../../../app/helpers/token');


let sandbox;


describe('Unit Test for Generate Token', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    let token = '';
    it('Test generateToken to pass', async() => {
        const user = {
            id: 12345,
            name: 'Akin'
        };
        const response = await generateToken(user);
        token = response;
        assert(response !== null);
    });


    it('Test verifyToken to pass', async() => {
        const user = {
            id: 12345,
            name: 'Akin'
        };
        const response = await verifyToken(token);
        assert(response.name === user.name);
    });
});
