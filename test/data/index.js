const moment = require('moment');
const Helpers = require('../../app/helpers');
const query = require('../../app/sql');
const db = require('../../lib/database');

const users = [
    {
        username: 'testusername',
        email: 'test@gmail.com',
        date_of_birth: '1990-01-01'
    },
    {
        username: 'krsj',
        email: 'krsj@gmail.com',
        date_of_birth: '1990-01-01'
    },
    {
        username: 'manaseh',
        email: 'mnsh@gmail.com',
        date_of_birth: '1990-01-01'
    },
    {
        username: 'zaheer',
        email: 'zaheer@gmail.com',
        date_of_birth: '1990-01-01'
    }
];
const password = 'testpasswordscript';
const timestamp = moment();

const setupTestDB = async() => {
    const passwordData = await Helpers.Password.hashUserPassword(password);
    const { salt, hash } = passwordData;
    await db.tx((t) => {
        const queries = users.map((user) => {
            const { username, email, date_of_birth } = user;
            t.one(query.UserSql.createUser, [ username, email, hash,
                salt, date_of_birth, true, timestamp, timestamp ]);
        });
        return t.batch(queries);
    });
};


setupTestDB();
