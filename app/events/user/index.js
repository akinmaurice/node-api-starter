const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

const Email = require('../../email');
const Helpers = require('../../helpers');
const DB = require('../../db');
const config = require('../../../config');
const moment = require('moment');

userEvent.on('register', async(user) => {
    try {
        const str = Helpers.Utils.getRandomString(25);
        const obj = {
            str,
            created_at: moment()
        };
        const cache = config.CACHE.TOKEN_CACHE;
        const data = Object.assign(obj, user);
        await DB.CacheDb.saveKey(cache, str, data);
        Email.sendNewUserEmail(data);
    } catch (e) {
        logger.error('Error Sending Email to new users');
        logger.error(e);
    }
});

module.exports = userEvent;
