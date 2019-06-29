const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

const Utils = require('./utils');


userEvent.on('register', async(user) => {
    try {
        await Utils.register(user);
    } catch (e) {
        logger.error('Error Sending Email to new users');
        logger.error(e);
    }
});


userEvent.on('resend-activation', async(user) => {
    try {
        await Utils.resendActivation(user);
    } catch (e) {
        logger.error('Error Re-Sending Activation Email');
        logger.error(e);
    }
});


module.exports = userEvent;
