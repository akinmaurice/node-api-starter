const Q = require('q');
const query = require('../queries/auth');
const db = require('../../lib/database');

const getUserByEmail = async(email) => {
    const defer = Q.defer();
    try {
        const user = await db.oneOrNone(query.getUserByEmail, [ email ]);
        defer.resolve(user);
    } catch (e) {
        defer.reject(e);
    }
    return defer.promise;
};


const getUserByUserName = async(username) => {
    const defer = Q.defer();
    try {
        const user = await db.oneOrNone(query.getUserByUserName, [ username ]);
        defer.resolve(user);
    } catch (e) {
        defer.reject(e);
    }
    return defer.promise;
};


const getUserById = async(id) => {
    const defer = Q.defer();
    try {
        const user = await db.oneOrNone(query.getUserByID, [ id ]);
        defer.resolve(user);
    } catch (e) {
        defer.reject(e);
    }
    return defer.promise;
};


const getUserByEmailOrUserName = async(arg) => {
    const defer = Q.defer();
    try {
        const user = await db.oneOrNone(query.getUserByEmailOrUserName, [ arg ]);
        defer.resolve(user);
    } catch (e) {
        defer.reject(e);
    }
    return defer.promise;
};


const saveUser = async(username, email, hash, salt,
    date_of_birth, is_verified, created_at, updated_at) => {
    const defer = Q.defer();
    try {
        await db.none(query.createUser, [
            username, email, hash, salt, date_of_birth,
            is_verified, created_at, updated_at
        ]);
        defer.resolve(true);
    } catch (e) {
        defer.reject(e);
    }
    return defer.promise;
};


module.exports = {
    getUserByEmail,
    getUserByUserName,
    getUserById,
    getUserByEmailOrUserName,
    saveUser
};
