const Q = require('q');
const moment = require('moment');
const DB = require('../../db');
const Helpers = require('../../helpers');

function updatePassword(user_id, new_password, old_password) {
    return new Promise((async(resolve, reject) => {
        try {
            const user = await DB.UserDb.getUserById(user_id);
            if (!user) {
                const error = {
                    code: 400,
                    msg: 'Could not find a user with that id'
                };
                reject(error);
                return;
            }
            const { hash, salt } = user;
            const promise = Q.all([
                Helpers.Password.verifyPassword(old_password, hash, salt),
                Helpers.Password.hashUserPassword(new_password)
            ]);
            const [ arg, data ] = await promise;
            if (!arg) {
                const error = {
                    code: 400,
                    msg: 'Please enter a valid password'
                };
                reject(error);
                return;
            }
            const updated_at = moment();
            const { hash: new_hash, salt: new_salt } = data;
            await DB.UserDb.updatePassword(new_hash, new_salt,
                updated_at, user_id);
            resolve(true);
        } catch (e) {
            errorHandler('Update Password', e);
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}

module.exports = updatePassword;
