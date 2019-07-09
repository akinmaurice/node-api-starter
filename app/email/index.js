const UserEmail = require('./user');
const sendEmail = require('../../lib/mailer');


const sendNewUserEmail = async(user) => {
    try {
        const data = UserEmail.sendToNewUser(user);
        await sendEmail(data);
    } catch (e) {
        errorHandler('New User Email Error', e);
    }
};


const resendActivation = async(user) => {
    try {
        const data = UserEmail.resendActivationCode(user);
        await sendEmail(data);
    } catch (e) {
        errorHandler('Resend Activation Error', e);
    }
};


const resetPassword = async(user) => {
    try {
        const data = UserEmail.resetPassword(user);
        await sendEmail(data);
    } catch (e) {
        errorHandler('Reset Password Email Error', e);
    }
};

module.exports = {
    sendNewUserEmail,
    resendActivation,
    resetPassword
};
