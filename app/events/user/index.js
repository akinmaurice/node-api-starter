const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

const Utils = require('./utils');


userEvent.on('register', async(user) => {
    try {
        await Utils.register(user);
    } catch (e) {
        errorHandler('User Registration Event', e);
    }
});


userEvent.on('resend-activation', async(user) => {
    try {
        await Utils.resendActivation(user);
    } catch (e) {
        errorHandler('Resend Activation Event', e);
    }
});


userEvent.on('reset-password', async(user) => {
    try {
        await Utils.resetPassword(user);
    } catch (e) {
        errorHandler('Reset Password Event', e);
    }
});

module.exports = userEvent;
