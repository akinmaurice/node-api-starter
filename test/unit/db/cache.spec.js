const sinon = require('sinon');
const chai = require('chai');
const assert = require('assert');

const redisClient = require('../../../lib/redis');


const CacheDB = require('../../../app/db/cache');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('Unit Test for Cache DB', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should Fail Save Key to Cache. Redis Error', async() => {
        const arg = 'token_cache';
        const key = 'hjbdhjbjhd';
        const data = {
            id: 12345
        };
        const error = {
            msg: 'Redis Error'
        };
        sandbox.stub(redisClient, 'hsetAsync').returns(Promise.reject(error));
        await expect(CacheDB.saveKey(arg, key, data)).to.be.rejected;
    });


    it('Should Save Key to Cache', async() => {
        const arg = 'token_cache';
        const key = 'hjbdhjbjhd';
        const data = {
            id: 12345
        };
        sandbox.stub(redisClient, 'hsetAsync').returns(Promise.resolve());
        const response = await CacheDB.saveKey(arg, key, data);
        assert(response === true);
    });


    it('Should fail to get Key From Cache. Redis Error', async() => {
        const arg = 'token_cache';
        const key = 'hjbdhjbjhd';
        const error = {
            msg: 'Redis Error'
        };
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.reject(error));
        await expect(CacheDB.getKey(arg, key)).to.be.rejected;
    });


    it('Should get Key From Cache', async() => {
        const arg = 'token_cache';
        const key = 'hjbdhjbjhd';
        let data = {
            id: 12345
        };
        data = JSON.stringify(data);
        sandbox.stub(redisClient, 'hgetAsync').returns(Promise.resolve(data));
        const response = await CacheDB.getKey(arg, key);
        assert(response !== null);
    });


    it('Should fail to remove Key From Cache. Redis Error', async() => {
        const arg = 'token_cache';
        const key = 'hjbdhjbjhd';
        const error = {
            msg: 'Redis Error'
        };
        sandbox.stub(redisClient, 'hdelAsync').returns(Promise.reject(error));
        await expect(CacheDB.removeKey(arg, key)).to.be.rejected;
    });


    it('Should delete Key From Cache', async() => {
        const arg = 'token_cache';
        const key = 'hjbdhjbjhd';
        sandbox.stub(redisClient, 'hdelAsync').returns(Promise.resolve());
        const response = await CacheDB.removeKey(arg, key);
        assert(response === true);
    });
});
