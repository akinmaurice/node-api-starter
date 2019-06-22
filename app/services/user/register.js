const Q = require('q');
const moment = require('moment');
const UserDb = require('../../db/user');
const passwordHelper = require('../../helpers/password');

async function register(data) {
    const defer = Q.defer();
    try {
        const {
            email, username, password, date_of_birth
        } = data;
        const email_user = await UserDb.getUserByEmail(email);
        const username_user = await UserDb.getUserByUserName(username);
        if (email_user) {
            defer.reject({
                code: 400,
                msg: 'A User with that Email exists already'
            });
        } else if (username_user) {
            defer.reject({
                code: 400,
                msg: 'A User with that UserName exists already'
            });
        } else {
            const { salt, hash } = await passwordHelper.hashUserPassword(password);
            const created_at = moment();
            const updated_at = moment();
            const is_verified = true;
            await UserDb.saveUser(
                username, email, hash, salt,
                date_of_birth, is_verified,
                created_at, updated_at
            );
            defer.resolve(true);
        }
    } catch (e) {
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
}

module.exports = register;
