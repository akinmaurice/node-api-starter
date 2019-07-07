let dbm,
    // eslint-disable-next-line no-unused-vars
    type,
    // eslint-disable-next-line no-unused-vars
    seed,
    Promise;

const fs = require('fs');
const path = require('path');


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
    // eslint-disable-next-line prefer-destructuring
    Promise = options.Promise;
};

exports.up = function(db) {
    const filePath = path.join(__dirname, 'sqls', '20190606090744-user-table-up.sql');
    return new Promise(((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }))
        .then((data) => db.runSql(data));
};

exports.down = function(db) {
    const filePath = path.join(__dirname, 'sqls', '20190606090744-user-table-down.sql');
    return new Promise(((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }))
        .then((data) => db.runSql(data));
};

exports._meta = {
    version: 1
};
