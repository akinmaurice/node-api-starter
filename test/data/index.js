const Q = require('q');
const moment = require('moment');
const Helpers = require('../../app/helpers');
const query = require('../../app/sql');
const db = require('../../lib/database');

const user = {
    username: 'testusername',
    password: 'testpasswordscript',
    email: 'test@gmail.com',
    date_of_birth: '1990-01-01'
};
const timestamp = moment();

const setupTestDB = async() => {
    console.log('Setting Up Test Seed');
    const passwordData = await Helpers.Password.hashUserPassword(user.password);
    const { salt, hash } = passwordData;
    const { username, email, date_of_birth } = user;
    const promise = Q.all([
        db.one(query.UserSql.createUser, [ username, email, hash, salt, date_of_birth, true, timestamp, timestamp ])
    ]);
    await promise;
    console.log('Done Setting Up Test Seed');
};


setupTestDB();
