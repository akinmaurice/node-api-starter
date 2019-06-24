const UserEmail = require('./user');
const sendEmail = require('../../lib/mailer');


const sendNewUserEmail = (user) => {
    const data = UserEmail.sendToNewUser(user);
    sendEmail(data);
};

module.exports = {
    sendNewUserEmail
};
