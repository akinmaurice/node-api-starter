const registerUser = require('./register');
const loginUser = require('./login');
const activateUser = require('./activate.user');
const resendActivationCode = require('./resend.activation');
const updatePassword = require('./update.password');
const resetPassword = require('./reset.password');
const verifyPasswordReset = require('./verify.password.reset');
const changePassword = require('./change.password');


module.exports = {
    registerUser,
    loginUser,
    activateUser,
    resendActivationCode,
    updatePassword,
    resetPassword,
    verifyPasswordReset,
    changePassword
};
