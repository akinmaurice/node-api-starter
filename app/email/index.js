const UserEmail = require('./user');
const sendEmail = require('../../lib/mailer');


const sendNewUserEmail = async(user) => {
    try {
        const data = UserEmail.sendToNewUser(user);
        sendEmail(data);
    } catch (e) {
        logger.error(e);
    }
};


const resendActivation = async(user) => {
    try {
        const data = UserEmail.resendActivationCode(user);
        sendEmail(data);
    } catch (e) {
        logger.error(e);
    }
};

module.exports = {
    sendNewUserEmail,
    resendActivation
};
