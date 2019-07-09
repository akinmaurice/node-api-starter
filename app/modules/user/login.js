const Helpers = require('../../helpers');
const DB = require('../../db');

function login(arg, password) {
    return new Promise((async(resolve, reject) => {
        try {
            const user = await DB.UserDb.getUserByEmailOrUserName(arg);
            if (!user) {
                const error = {
                    code: 400,
                    msg: 'Invalid Username/Email and Password combination'
                };
                reject(error);
                return;
            }
            const { is_verified } = user;
            if (!is_verified) {
                const error = {
                    code: 400,
                    msg: 'Please activate your account to sign in'
                };
                reject(error);
                return;
            }
            const { hash, salt } = user;
            const result = await Helpers.Password.verifyPassword(password, hash, salt);
            if (!result) {
                const error = {
                    code: 400,
                    msg: 'Invalid Username/Email and Password combination'
                };
                reject(error);
                return;
            }
            const user_details = Helpers.Transformer.transformUser(user);
            const access_token = await Helpers.Token.generateToken(user_details);
            const data = {
                access_token,
                user_details
            };
            resolve(data);
        } catch (e) {
            errorHandler('Login', e);
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}


module.exports = login;
