const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

const Email = require('../../email');

userEvent.on('register', (user) => {
    Email.sendNewUserEmail(user);
});

module.exports = userEvent;
