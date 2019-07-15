const moment = require('moment');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const loggerInit = require('../config/logger');
const Helpers = require('../app/helpers');
const query = require('../app/sql');
const db = require('../lib/database');

const logger = loggerInit('development');
const fakeUsersCount = 500;
const limit = 100;


const arr = [
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
const password = 'testPassword';


const insertUser = async(user) => new Promise(async(resolve, reject) => {
    try {
        const timestamp = moment();
        const {
            username, email, date_of_birth, hash, salt
        } = user;
        const id = Helpers.Utils.generateId();
        await db.one(query.UserSql.createUser, [ id, username, email, hash,
            salt, date_of_birth, true, timestamp, timestamp ]);
        resolve(true);
    } catch (e) {
        reject(e);
    }
});


const processUsers = (users) => new Promise(async(resolve, reject) => {
    const requests = users.map(async(record) => {
        await insertUser(record)
            .catch(e => logger.error(`Error creating ${record.email} - ${e}`));
    });
    await Promise.all(requests)
        .catch(e => {
            logger.error('Error with Promise all');
            reject(e);
        });
    resolve();
});


const batchUsersFetch = () => new Promise(async(resolve, reject) => {
    try {
        const count = fakeUsersCount;
        const batches = Math.ceil((count) / (limit));
        logger.info(`[Seed Test DB Job]: Total Records to Process ${count}`);
        logger.info(`[Seed Test DB Job]: Running in ${batches} Batch(es)`);
        const { hash, salt } = await Helpers.Password.hashUserPassword(password);
        let page = 1;
        let recordsExist = true;
        const date = faker.date.between('1970-01-01', '2000-12-31');
        while (recordsExist) {
            const users = [];
            logger.info(`[Seed Test DB Job]: Processing records for Batch ${page}`);
            for (let i = 1; i <= limit; i += 1) {
                const user = {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    date_of_birth: moment(date).format('YYYY-MM-DD'),
                    hash,
                    salt
                };
                users.push(user);
            }
            // eslint-disable-next-line no-await-in-loop
            await processUsers(users);
            page += 1;
            if (page === batches + 1) {
                logger.info('[Seed Test DB Job]: No more records to process');
                logger.info(`[Seed Test DB Job]: Total records processed ${count}`);
                recordsExist = false;
                resolve(page);
                return;
            }
        }
    } catch (e) {
        reject(e);
        logger.error(e);
    }
});


const batchUsersReal = () => new Promise(async(resolve, reject) => {
    try {
        const { hash, salt } = await Helpers.Password.hashUserPassword(password);
        const date = faker.date.between('1970-01-01', '2000-12-31');
        const realUsers = [];
        arr.forEach((element) => {
            const user = element;
            user.salt = salt;
            user.hash = hash;
            user.date_of_birth = date;
            realUsers.push(user);
        });
        processUsers(realUsers);
        resolve(true);
    } catch (e) {
        reject(e);
    }
});

const runBatchProcess = async() => {
    try {
        const env = process.env.NODE_ENV;
        logger.debug(`Seed Test DB Job Starting @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        if (env === 'development' || env === 'test') {
            logger.debug(`Seed Test DB Job Running in ${env} Environment`);
            await batchUsersReal();
            await batchUsersFetch();
            logger.debug(`Seed Test DB Job Ending @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        } else {
            logger.warn(`Seed Test DB Job Cannot be Executed in ${env} Environment`);
        }
        process.exit();
    } catch (e) {
        logger.error(`Seed Test DB Job Ended with Error @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        logger.error(e);
        process.exit();
    }
};


runBatchProcess();
