const DB = require('../../db');
const Event = require('../../events');

function resetPassword(arg) {
    return new Promise((async(resolve, reject) => {
        try {
            const user = await DB.UserDb.getUserByEmail(arg);
            if (!user) {
                const error = {
                    code: 400,
                    msg: 'Could not find a user with that email'
                };
                reject(error);
                return;
            }
            if (!user.is_verified) {
                const error = {
                    code: 400,
                    msg: 'User account is not activated yet'
                };
                reject(error);
                return;
            }
            const data = {
                user_id: user.id,
                email: user.email,
                username: user.username
            };
            Event.UserEvents.emit('reset-password', data);
            resolve(true);
        } catch (e) {
            errorHandler('Reset Password', e);
            const error = {
                code: 500,
                msg: 'Unknown Error'
            };
            reject(error);
        }
    }));
}

module.exports = resetPassword;
