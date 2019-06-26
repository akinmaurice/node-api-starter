const express = require('express');


const router = express.Router();

const authController = require('../controllers/auth');

router.post(
    '/register',
    authController.registerUser
);


router.post(
    '/login',
    authController.loginUser
);


router.get(
    '/activate/:token',
    authController.activateUser
);

module.exports = router;
