const moment = require('moment');
const Q = require('q');
const DB = require('../../db');
const config = require('../../../config');

/**
 * @description This function actiavtes a users account
 * @param {String} arg Key representing the user to fetch from cache
 * @returns {Boolean} Returns true if successful
 */
function activateAccount(arg) {
    return new Promise((async(resolve, reject) => {
        try {
            const cache = config.CACHE.TOKEN_CACHE;
            const data = await DB.CacheDb.getKey(cache, arg);
            if (!data) {
                const error = {
                    code: 400,
                    msg: 'Invalid Token Provided'
                };
                reject(error);
                return;
            }
            const { user_id, created_at } = data;
            const a = moment(created_at);
            const b = moment();
            const dateDifference = b.diff(a, 'seconds');
            const expiryTime = config.VERIFICATION_CODE_EXPIRY;
            if (dateDifference > expiryTime) {
                const error = {
                    code: 400,
                    msg: 'Token has expired!'
                };
                reject(error);
                return;
            }
            const user = await DB.UserDb.getUserById(user_id);
            if (!user) {
                const error = {
                    code: 400,
                    msg: 'Invalid Token Provided'
                };
                reject(error);
                return;
            }
            if (user.is_verified) {
                const error = {
                    code: 400,
                    msg: 'Account is active already'
                };
                reject(error);
                return;
            }
            const is_verified = true;
            const updated_at = moment();
            const promise = Q.all([
                DB.UserDb.activateUser(is_verified, updated_at, user_id),
                DB.CacheDb.removeKey(cache, arg)
            ]);
            await promise;
            resolve(true);
        } catch (e) {
            errorHandler('Activate Account', e);
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}

module.exports = activateAccount;
