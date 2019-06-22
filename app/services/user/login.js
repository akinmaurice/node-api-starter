const { transformUser } = require('../../helpers/transformer');
const { generateToken } = require('../../helpers/token');
const passwordHelper = require('../../helpers/password');
const UserDb = require('../../db/user');

function login(arg, password) {
    return new Promise((async(resolve, reject) => {
        try {
            const user = await UserDb.getUserByEmailOrUserName(arg);
            if (!user) {
                const error = {
                    code: 400,
                    msg: 'Invalid Username/Email and Password combination'
                };
                reject(error);
            }
            const { hash, salt } = user;
            const result = await passwordHelper.verifyPassword(password, hash, salt);
            if (!result) {
                const error = {
                    code: 400,
                    msg: 'Invalid Username/Email and Password combination'
                };
                reject(error);
            }
            const user_details = transformUser(user);
            const access_token = await generateToken(user_details);
            const data = {
                access_token,
                user_details
            };
            resolve(data);
        } catch (e) {
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}


module.exports = login;
