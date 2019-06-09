const sinon = require('sinon');
const assert = require('assert');

const { transformUser } = require('../../../app/helpers/transformer');


let sandbox;


describe('Unit Test for Transformer', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Test Transform user to return Null', async() => {
        const response = transformUser();
        assert(response === null);
    });

    it('Test Transform user to remove hash and salt', async() => {
        const user = {
            id: 12345,
            name: 'Akin',
            hash: 'jdjkdkjfhfhf',
            salt: 'jkfjfkjfhkfh',
            is_verified: true
        };
        const response = transformUser(user);
        assert(response !== null);
    });
});
