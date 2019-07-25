const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');
const moment = require('moment');

const db = require('../../../lib/database');


const UserDB = require('../../../app/db/user');

chai.use(chaiAsPromised);

const { expect } = chai;
let sandbox;


describe('Unit Test for User DB', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should fail to get user by Email. Db Error', async() => {
        const email = 'akin@gmail.com';
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject(error));
        await expect(UserDB.getUserByEmail(email)).to.be.rejectedWith(error);
    });


    it('Should get user by Email.', async() => {
        const email = 'akin69@gmail.com';
        const user = {
            id: 12345,
            username: 'Akin',
            hash: 'jdhdhdhdhd',
            salt: 'jsjshsh'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await UserDB.getUserByEmail(email);
        assert(response === user);
    });


    it('Should fail to get user by UserName. Db Error', async() => {
        const username = 'akin69';
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject(error));
        await expect(UserDB.getUserByUserName(username)).to.be.rejectedWith(error);
    });


    it('Should get user by UserName.', async() => {
        const username = 'Akin';
        const user = {
            id: 12345,
            username: 'Akin',
            hash: 'jdhdhdhdhd',
            salt: 'jsjshsh'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await UserDB.getUserByUserName(username);
        assert(response === user);
    });


    it('Should fail to get user by ID. Db Error', async() => {
        const id = 12345;
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject(error));
        await expect(UserDB.getUserById(id)).to.be.rejectedWith(error);
    });


    it('Should get user by Id.', async() => {
        const id = 12345;
        const user = {
            id: 12345,
            username: 'Akin',
            hash: 'jdhdhdhdhd',
            salt: 'jsjshsh'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await UserDB.getUserById(id);
        assert(response === user);
    });


    it('Should fail to get user by UserName or Email. Db Error', async() => {
        const arg = 'akin';
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject(error));
        await expect(UserDB.getUserByEmailOrUserName(arg)).to.be.rejectedWith(error);
    });


    it('Should get user by Username or Email.', async() => {
        const arg = 'akin69';
        const user = {
            id: 12345,
            username: 'Akin',
            hash: 'jdhdhdhdhd',
            salt: 'jsjshsh'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(user));
        const response = await UserDB.getUserByEmailOrUserName(arg);
        assert(response === user);
    });


    it('Should fail to save user. Db Error', async() => {
        const username = 'akin';
        const email = 'akin@gmail.com';
        const hash = 'jdhdhdhdhd';
        const salt = 'jsjshsh';
        const is_verified = false;
        const created_at = moment();
        const updated_at = moment();
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'one').returns(Promise.reject(error));
        await expect(UserDB.saveUser(
            username, email, hash,
            salt, is_verified,
            created_at, updated_at
        )).to.be.rejectedWith(error);
    });


    it('Should Save New User.', async() => {
        const username = 'akin';
        const email = 'akinben@gmail.com';
        const hash = 'jdhdhdhdhd';
        const salt = 'jsjshsh';
        const is_verified = false;
        const created_at = moment();
        const updated_at = moment();
        const user = {
            id: 123456
        };
        sandbox.stub(db, 'one').returns(Promise.resolve(user));
        const response = await UserDB.saveUser(
            username, email, hash,
            salt, is_verified,
            created_at, updated_at
        );
        assert(response === user);
    });


    it('Should fail to Count Users. Db Error', async() => {
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject(error));
        await expect(UserDB.countUsers()).to.be.rejectedWith(error);
    });


    it('Should Count Users', async() => {
        const result = {
            count: 2
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(result));
        const response = await UserDB.countUsers();
        assert(response === result);
    });


    it('Should fail to All Users. Db Error', async() => {
        const page = 1;
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.reject(error));
        sandbox.stub(db, 'any').returns(Promise.reject(error));
        await expect(UserDB.getAllUsers(page)).to.be.rejectedWith(error);
    });


    it('Should get all Users.', async() => {
        const page = 1;
        const count = {
            count: 1
        };
        const users = [
            {
                id: 12345,
                name: 'test user'

            }
        ];
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(count));
        sandbox.stub(db, 'any').returns(Promise.resolve(users));
        const response = await UserDB.getAllUsers(page);
        assert(response.users === users);
        assert(response.users_count === 1);
        assert(response.page_count === 1);
        assert(response.page_number === 1);
    });


    it('Should fail to Update Activate User Account. Db Error', async() => {
        const is_verified = true;
        const updated_at = moment();
        const user_id = 'user-12345';
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'none').returns(Promise.reject(error));
        await expect(UserDB.activateUser(is_verified, updated_at, user_id)).to.be.rejectedWith(error);
    });


    it('Should Activate User Account', async() => {
        const is_verified = true;
        const updated_at = moment();
        const user_id = 'user-12345';
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const response = await UserDB.activateUser(is_verified, updated_at, user_id);
        assert(response === true);
    });


    it('Should fail to Update User Password. Db Error', async() => {
        const hash = 'kdhdhdhd';
        const salt = 'jdhdhd';
        const updated_at = moment();
        const user_id = 'user-12345';
        const error = {
            msg: 'DB Error'
        };
        sandbox.stub(db, 'none').returns(Promise.reject(error));
        await expect(UserDB.updatePassword(hash, salt, updated_at, user_id)).to.be.rejectedWith(error);
    });


    it('Should Update User Password', async() => {
        const hash = 'kdhdhdhd';
        const salt = 'jdhdhd';
        const updated_at = moment();
        const user_id = 'user-12345';
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const response = await UserDB.updatePassword(hash, salt, updated_at, user_id);
        assert(response === true);
    });
});
