const Q = require('q');
const query = require('../queries/user');
const db = require('../../lib/database');
const config = require('../../config');

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


const getAllUsers = async(page) => {
    const defer = Q.defer();
    try {
        const limit = config.pagination_limit;
        const page_number = parseFloat(page) || 1;
        const offset = ((page_number - 1) * limit);
        const promise = Q.all([
            db.any(query.getAllUsers, [ offset, limit ]),
            db.oneOrNone(query.countUsers)
        ]);
        const result = await promise;
        const users_count = parseFloat(result[1].count);
        const page_count = Math.ceil(users_count / limit);
        const users = result[0];
        const data = {
            users,
            users_count,
            page_count,
            page_number
        };
        defer.resolve(data);
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
    saveUser,
    getAllUsers
};
