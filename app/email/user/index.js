const swig = require('swig-templates');
const path = require('path');
const config = require('../../../config');


const sendToNewUser = (user) => {
    const { str } = user;
    let obj = user;
    const code = `http://www.api.com/${str}`;
    const template = swig.compileFile(path.join(__dirname, './templates/newUser.html'));
    obj = Object.assign({}, JSON.parse(JSON.stringify(obj)), { code });

    const output = template(obj);

    const data = {
        from: 'email@gmail.com',
        to: user.email,
        subject: `${config.SERVICE_NAME} Welcome`,
        text: output,
        html: output
    };
    return data;
};


const resendActivationCode = (user) => {
    const { str } = user;
    let obj = user;
    const code = `http://www.api.com/${str}`;
    const template = swig.compileFile(path.join(__dirname, './templates/resendActivation.html'));
    obj = Object.assign({}, JSON.parse(JSON.stringify(obj)), { code });

    const output = template(obj);

    const data = {
        from: 'email@gmail.com',
        to: user.email,
        subject: `${config.SERVICE_NAME} Re-Activate`,
        text: output,
        html: output
    };
    return data;
};


const resetPassword = (user) => {
    const { str } = user;
    let obj = user;
    const code = `http://www.api.com/${str}`;
    const template = swig.compileFile(path.join(__dirname, './templates/resetPassword.html'));
    obj = Object.assign({}, JSON.parse(JSON.stringify(obj)), { code });

    const output = template(obj);

    const data = {
        from: 'email@gmail.com',
        to: user.email,
        subject: `${config.SERVICE_NAME} Reset Password`,
        text: output,
        html: output
    };
    return data;
};


module.exports = {
    sendToNewUser,
    resendActivationCode,
    resetPassword
};
