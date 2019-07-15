const Q = require('q');
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
            const { hash } = user;
            const promise = Q.all([
                Helpers.Password.verifyPassword(password, hash),
                Helpers.Transformer.transformUser(user)
            ]);
            const [ result, user_details ] = await promise;
            if (!result) {
                const error = {
                    code: 400,
                    msg: 'Invalid Username/Email and Password combination'
                };
                reject(error);
                return;
            }
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
