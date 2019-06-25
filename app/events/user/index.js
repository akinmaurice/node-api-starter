const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

const Email = require('../../email');
const Helpers = require('../../helpers');

userEvent.on('register', (user) => {
    const str = Helpers.Utils.getRandomString(25);
    const obj = {
        str
    };
    const data = Object.assign(obj, user);
    Email.sendNewUserEmail(data);
});

module.exports = userEvent;
