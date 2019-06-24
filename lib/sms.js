const twilio = require('twilio');
const config = require('../config');


const accountSid = config.TWILIO_SID;
const authToken = config.TWILIO_AUTH_TOKEN;


const client = twilio(accountSid, authToken);


const sendSms = (data) => new Promise((async(resolve, reject) => {
    const { message, phone_number } = data;
    try {
        await client.messages.create({
            body: message,
            to: phone_number
        });
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


module.exports = sendSms;
