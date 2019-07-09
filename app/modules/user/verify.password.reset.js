const moment = require('moment');
const DB = require('../../db');
const config = require('../../../config');


function verifyPasswordReset(arg) {
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
            resolve(true);
        } catch (e) {
            errorHandler('Verify Reset Password Token', e);
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}

module.exports = verifyPasswordReset;
