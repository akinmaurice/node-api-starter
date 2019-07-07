const registerUser = require('./register');
const loginUser = require('./login');
const activateUser = require('./activate.user');
const resendActivationCode = require('./resend.activation');
const updatePassword = require('./update.password');
const resetPassword = require('./reset.password');
const verifyPasswordReset = require('./verify.password.reset');


module.exports = {
    registerUser,
    loginUser,
    activateUser,
    resendActivationCode,
    updatePassword,
    resetPassword,
    verifyPasswordReset
};
