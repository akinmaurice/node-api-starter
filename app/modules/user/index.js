const login = require('./login');
const register = require('./register');
const activateAccount = require('./activate.user');
const resendActivationCode = require('./resend.activation');
const updatePassword = require('./update.password');

module.exports = {
    login,
    register,
    activateAccount,
    resendActivationCode,
    updatePassword
};
