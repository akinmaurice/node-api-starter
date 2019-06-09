const registerUser = require('./register.controller');
const loginUser = require('./login.controller');


const authController = {
    registerUser,
    loginUser
};


module.exports = authController;
