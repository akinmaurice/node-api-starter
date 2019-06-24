const swig = require('swig');
const path = require('path');
const config = require('../../../config');


const sendToNewUser = (user) => {
    let obj = user;
    const code = 'jjssjsjsjs';
    const template = swig.compileFile(path.join(__dirname, './templates/newUser.html'));
    obj = Object.assign({}, JSON.parse(JSON.stringify(obj)), { code });

    const output = template(obj);

    const data = {
        from: 'email@gmail.com',
        to: user.email,
        subject: `Welcome to ${config.SERVICE_NAME}`,
        text: output,
        html: output
    };
    return data;
};


module.exports = {
    sendToNewUser
};
