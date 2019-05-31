import config from './';

const pgp = require('pg-promise');
const promise = require('bluebird');

const pg = pgp({ promiseLib: promise, noLocking: true });
const Db = pg(config.DATABASE_URL);

export default Db;
