const sinon = require('sinon');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');

const app = require('../../../../index');
const db = require('../../../../lib/database');

const reportUserCount = require('../../../../worker/user/report.user.count');

chai.use(chaiAsPromised);

let sandbox;


describe('Unit Test for Report User Count Worker', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should run Report User Count Worker', async() => {
        request(app);
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve({ count: 12 }));
        const response = await reportUserCount();
        assert(response === true);
    });
});
