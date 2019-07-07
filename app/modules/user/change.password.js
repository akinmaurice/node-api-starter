const moment = require('moment');
const Q = require('q');
const Helpers = require('../../helpers');
const DB = require('../../db');
const config = require('../../../config');


function changePassword(arg) {
    return new Promise((async(resolve, reject) => {
        try {
            const { token, password } = arg;
            const cache = config.CACHE.TOKEN_CACHE;
            const promise = Q.all([
                DB.CacheDb.getKey(cache, token),
                Helpers.Password.hashUserPassword(password)
            ]);
            const result = await promise;
            const data = result[0];
            const passwordData = result[1];
            if (!data) {
                const error = {
                    code: 400,
                    msg: 'Invalid Token Provided'
                };
                reject(error);
                return;
            }
            const { created_at } = data;
            const a = moment(created_at);
            const b = moment();
            const dateDifference = b.diff(a, 'seconds');
            const expiryTime = config.RESET_PASSWORD_EXPIRY;
            if (dateDifference > expiryTime) {
                const error = {
                    code: 400,
                    msg: 'Token has expired!'
                };
                reject(error);
                return;
            }
            const { hash, salt } = passwordData;
            const { user_id } = data;
            const updated_at = moment();
            const updatePromise = Q.all([
                DB.CacheDb.removeKey(cache, token),
                DB.UserDb.updatePassword(hash, salt, updated_at, user_id)
            ]);
            await updatePromise;
            resolve(true);
        } catch (e) {
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}


module.exports = changePassword;
