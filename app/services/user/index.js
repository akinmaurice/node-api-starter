const login = require('./login');
const register = require('./register');
const activateAccount = require('./activate.user');
const resendActivationCode = require('./resend.activation');
const updatePassword = require('./update.password');
const resetPassword = require('./reset.password');
const verifyPasswordReset = require('./verify.password.reset');
const changePassword = require('./change.password');

module.exports = {
    login,
    register,
    activateAccount,
    resendActivationCode,
    updatePassword,
    resetPassword,
    verifyPasswordReset,
    changePassword
};
