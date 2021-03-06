const sgMail = require('@sendgrid/mail');
const config = require('../../config');


sgMail.setApiKey(config.SEND_GRID_API_KEY);


const sendMail = (options) => new Promise((async(resolve, reject) => {
    const msg = {
        to: options.to,
        from: options.from,
        subject: options.subject,
        text: options.text,
        html: options.html
    };

    try {
        await sgMail.send(msg);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


module.exports = sendMail;
