const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');

const {
    hashUserPassword,
    verifyPassword
} = require('../../../app/helpers/password');


const { expect } = chai;
let sandbox;


describe('Unit Test for Password Helper', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Test hashPassword to fail', async() => {
        await expect(hashUserPassword()).to.be.rejected;
    });


    it('Test hashPassword to pass', async() => {
        const password = 'AkinTestPass';
        const response = await hashUserPassword(password);
        assert(response !== null);
    });


    it('Test verifyPassword to fail', async() => {
        const salt = '$2b$10$V1bxiZUH50OMvVQJHadKwu';
        const hash = '$2b$10$V1bxiZUH50OMvVQJHadKwuLfClwC.neL00jdiRROMWd4RFziQWEN2';
        await expect(verifyPassword(hash, salt)).to.be.rejected;
    });


    it('Test verifyPassword to pass', async() => {
        const password = 'Johndoetest23Password';
        const salt = '$2b$10$V1bxiZUH50OMvVQJHadKwu';
        const hash = '$2b$10$V1bxiZUH50OMvVQJHadKwuLfClwC.neL00jdiRROMWd4RFziQWEN2';
        const response = await verifyPassword(password, hash, salt);
        assert(response === true);
    });
});