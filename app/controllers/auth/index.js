const registerUser = require('./register');
const loginUser = require('./login');
const activateUser = require('./activate.user');


const authController = {
    registerUser,
    loginUser,
    activateUser
};


module.exports = authController;
