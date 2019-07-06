const pgp = require('pg-promise');
const promise = require('bluebird');
const config = require('../config');

const pg = pgp({ promiseLib: promise, noLocking: true });
const Db = pg(config.DATABASE_URL);

module.exports = Db;
