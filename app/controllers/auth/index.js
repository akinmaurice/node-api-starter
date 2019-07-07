const registerUser = require('./register');
const loginUser = require('./login');
const activateUser = require('./activate.user');
const resendActivationCode = require('./resend.activation');
const updatePassword = require('./update.password');


module.exports = {
    registerUser,
    loginUser,
    activateUser,
    resendActivationCode,
    updatePassword
};
