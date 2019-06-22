const Q = require('q');
const { transformUser } = require('../../helpers/transformer');
const { generateToken } = require('../../helpers/token');
const passwordHelper = require('../../helpers/password');
const UserDb = require('../../db/user');

async function login(arg, password) {
    const defer = Q.defer();
    try {
        const user = await UserDb.getUserByEmailOrUserName(arg);
        if (!user) {
            defer.reject({
                code: 400,
                msg: 'Invalid Username/Email and Password combination'
            });
        } else {
            const { hash, salt } = user;
            const result = await passwordHelper.verifyPassword(password, hash, salt);
            if (!result) {
                defer.reject({
                    code: 400,
                    msg: 'Invalid Password combination'
                });
            } else {
                const user_details = transformUser(user);
                const access_token = await generateToken(user_details);
                const data = {
                    access_token,
                    user_details
                };
                defer.resolve(data);
            }
        }
    } catch (e) {
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
}

module.exports = login;
