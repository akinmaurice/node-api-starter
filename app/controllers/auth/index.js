const registerUser = require('./register');
const loginUser = require('./login');


const authController = {
    registerUser,
    loginUser
};


module.exports = authController;
