const moment = require('moment');
const Email = require('../../../email');
const Helpers = require('../../../helpers');
const DB = require('../../../db');
const config = require('../../../../config');

const cache = config.CACHE.TOKEN_CACHE;


const generateUserKey = (arg) => new Promise((async(resolve, reject) => {
    try {
        const str = Helpers.Utils.getRandomString(25);
        const obj = {
            str,
            created_at: moment()
        };
        const data = Object.assign(obj, arg);
        await DB.CacheDb.saveKey(cache, str, data);
        resolve(data);
    } catch (e) {
        reject(e);
    }
}));


const register = (user) => new Promise((async(resolve, reject) => {
    try {
        const data = await generateUserKey(user);
        await Email.sendNewUserEmail(data);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


const resendActivation = (user) => new Promise((async(resolve, reject) => {
    try {
        const data = await generateUserKey(user);
        await Email.resendActivation(data);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


const resetPassword = (user) => new Promise((async(resolve, reject) => {
    try {
        const data = await generateUserKey(user);
        await Email.resetPassword(data);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


module.exports = {
    register,
    resendActivation,
    resetPassword
};
