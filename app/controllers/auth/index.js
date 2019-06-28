const registerUser = require('./register');
const loginUser = require('./login');
const activateUser = require('./activate.user');
const resendActivationCode = require('./resend.activation');

const authController = {
    registerUser,
    loginUser,
    activateUser,
    resendActivationCode
};


module.exports = authController;
