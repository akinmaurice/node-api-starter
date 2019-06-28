const login = require('./login');
const register = require('./register');
const activateAccount = require('./activate.user');
const resendActivationCode = require('./resend.activation');

module.exports = {
    login,
    register,
    activateAccount,
    resendActivationCode
};
