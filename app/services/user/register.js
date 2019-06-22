const Q = require('q');
const moment = require('moment');
const UserDb = require('../../db/user');
const passwordHelper = require('../../helpers/password');
const userEvent = require('../../events/user');

function register(data) {
    return new Promise((async(resolve, reject) => {
        try {
            const {
                email, username, password, date_of_birth
            } = data;
            const user_promise = Q.all([
                UserDb.getUserByEmail(email),
                UserDb.getUserByUserName(username)
            ]);
            const result = await user_promise;
            const email_user = result[0];
            const username_user = result[1];
            if (email_user) {
                const error = {
                    code: 400,
                    msg: 'A User with that Email exists already'
                };
                reject(error);
            }
            if (username_user) {
                const error = {
                    code: 400,
                    msg: 'A User with that Username exists already'
                };
                reject(error);
            }
            const { salt, hash } = await passwordHelper.hashUserPassword(password);
            const created_at = moment();
            const updated_at = moment();
            const is_verified = true;
            await UserDb.saveUser(
                username, email, hash, salt,
                date_of_birth, is_verified,
                created_at, updated_at
            );
            userEvent.emit('register', email);
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

module.exports = register;
