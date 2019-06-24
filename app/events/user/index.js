const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

userEvent.on('register', (user) => {
    logger.info('New User Registration Email');
    logger.debug(user);
    // Method to Execute here
});

module.exports = userEvent;
