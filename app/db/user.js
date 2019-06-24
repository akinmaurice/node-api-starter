const Q = require('q');
const Query = require('../sql');
const db = require('../../lib/database');
const config = require('../../config');


const { PAGINATION_LIMIT } = config;

const getUserByEmail = (email) => new Promise((async(resolve, reject) => {
    try {
        const user = await db.oneOrNone(Query.UserSql.getUserByEmail, [ email ]);
        resolve(user);
    } catch (e) {
        reject(e);
    }
}));


const getUserByUserName = (username) => new Promise((async(resolve, reject) => {
    try {
        const user = await db.oneOrNone(Query.UserSql.getUserByUserName, [ username ]);
        resolve(user);
    } catch (e) {
        reject(e);
    }
}));


const getUserById = (id) => new Promise((async(resolve, reject) => {
    try {
        const user = await db.oneOrNone(Query.UserSql.getUserByID, [ id ]);
        resolve(user);
    } catch (e) {
        reject(e);
    }
}));


const getUserByEmailOrUserName = (arg) => new Promise((async(resolve, reject) => {
    try {
        const user = await db.oneOrNone(Query.UserSql.getUserByEmailOrUserName, [ arg ]);
        resolve(user);
    } catch (e) {
        reject(e);
    }
}));


const saveUser = (
    username, email, hash, salt,
    date_of_birth, is_verified, created_at, updated_at
) => new Promise((async(resolve, reject) => {
    try {
        await db.none(Query.UserSql.createUser, [
            username, email, hash, salt, date_of_birth,
            is_verified, created_at, updated_at
        ]);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


const countUsers = () => new Promise((async(resolve, reject) => {
    try {
        const count = await db.oneOrNone(Query.UserSql.countUsers);
        resolve(count);
    } catch (e) {
        reject(e);
    }
}));


const getAllUsers = (page) => new Promise((async(resolve, reject) => {
    try {
        const limit = PAGINATION_LIMIT;
        const page_number = parseFloat(page) || 1;
        const offset = ((page_number - 1) * limit);
        const promise = Q.all([
            db.any(Query.UserSql.getAllUsers, [ offset, limit ]),
            countUsers()
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
        resolve(data);
    } catch (e) {
        reject(e);
    }
}));


module.exports = {
    getUserByEmail,
    getUserByUserName,
    getUserById,
    getUserByEmailOrUserName,
    saveUser,
    countUsers,
    getAllUsers
};
