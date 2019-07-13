const Q = require('q');
const moment = require('moment');
const Helpers = require('../../helpers');
const DB = require('../../db');
const Event = require('../../events');

function register(data) {
    return new Promise((async(resolve, reject) => {
        try {
            const {
                email, username, password, date_of_birth
            } = data;
            const user_promise = Q.all([
                DB.UserDb.getUserByEmail(email),
                DB.UserDb.getUserByUserName(username),
                Helpers.Password.hashUserPassword(password)
            ]);
            const [ email_user, username_user, { salt, hash } ] = await user_promise;
            if (email_user) {
                const error = {
                    code: 400,
                    msg: 'A User with that Email exists already'
                };
                reject(error);
                return;
            }
            if (username_user) {
                const error = {
                    code: 400,
                    msg: 'A User with that Username exists already'
                };
                reject(error);
                return;
            }
            const created_at = moment();
            const updated_at = moment();
            const is_verified = false;
            const user = await DB.UserDb.saveUser(
                username, email, hash, salt,
                date_of_birth, is_verified,
                created_at, updated_at
            );
            const arg = {
                user_id: user.id,
                email,
                username
            };
            Event.UserEvents.emit('register', arg);
            resolve(true);
        } catch (e) {
            errorHandler('Register', e);
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}

module.exports = register;
