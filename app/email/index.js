const UserEmail = require('./user');
const sendEmail = require('../../lib/mailer');


const sendNewUserEmail = async(user) => new Promise((async(resolve, reject) => {
    try {
        const data = UserEmail.sendToNewUser(user);
        await sendEmail(data);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


const resendActivation = async(user) => new Promise((async(resolve, reject) => {
    try {
        const data = UserEmail.resendActivationCode(user);
        await sendEmail(data);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


const resetPassword = async(user) => new Promise((async(resolve, reject) => {
    try {
        const data = UserEmail.resetPassword(user);
        await sendEmail(data);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


module.exports = {
    sendNewUserEmail,
    resendActivation,
    resetPassword
};
