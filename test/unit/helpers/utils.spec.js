const sinon = require('sinon');
const assert = require('assert');

const {
    encryption,
    decryption,
    encoder,
    formatPhone,
    roundNumber,
    formatAmount,
    getCipherKey
} = require('../../../app/helpers/utils');


let sandbox;


describe('Unit Test for Utils Helpers', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    let token = '';

    it('Test Get Cipher Key', async() => {
        const code = '123456';
        const response = getCipherKey(code);
        assert(response !== null);
    });


    it('Test Encryption', async() => {
        const code = '123456';
        const response = encryption(code);
        token = response;
        assert(response !== null);
    });


    it('Test Decryption', async() => {
        const response = decryption(token);
        assert(response === '123456');
    });


    it('Test Encoder to encode a String', async() => {
        const arg = 'Akin@gmail.com';
        const response = encoder(arg);
        assert(response !== null);
    });


    it('Test Encoder to encode an Object', async() => {
        const arg = {
            email: 'Akin@gmail.com'
        };
        const response = encoder(JSON.stringify(arg));
        assert(response !== null);
    });


    it('Test format Phone Number', async() => {
        const number = '08032665677';
        const response = formatPhone(number);
        assert(response === '2348032665677');
    });


    it('Test Round Number to 3 decimal places', async() => {
        const number = 1984.64747;
        const response = roundNumber(number, 3);
        assert(response === 1984.647);
    });


    it('Test Round Number to 2 decimal places', async() => {
        const number = 1984.64747;
        const response = roundNumber(number);
        assert(response === 1984.65);
    });


    it('Test Format Amount', async() => {
        const number = 1984;
        const response = formatAmount(number);
        assert(response === '1,984');
    });
});
