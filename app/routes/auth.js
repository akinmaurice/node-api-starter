const express = require('express');


const router = express.Router();

const Controllers = require('../controllers');

router.post(
    '/register',
    Controllers.AuthController.registerUser
);


router.post(
    '/login',
    Controllers.AuthController.loginUser
);


router.get(
    '/activate/:token',
    Controllers.AuthController.activateUser
);


router.post(
    '/activate/resend',
    Controllers.AuthController.resendActivationCode
);


router.post(
    '/password/reset',
    Controllers.AuthController.resetPassword
);


router.get(
    '/password/reset',
    Controllers.AuthController.verifyPasswordReset
);


router.put(
    '/password/reset',
    Controllers.AuthController.changePassword
);

module.exports = router;
