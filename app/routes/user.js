const express = require('express');

const router = express.Router();

const MiddleWare = require('../middleware');
const Helpers = require('../helpers');
const Controllers = require('../controllers');


router.put(
    '/password',
    MiddleWare.Auth.extractUser,
    Controllers.AuthController.updatePassword
);


router.get(
    '/protected',
    MiddleWare.Auth.extractUser,
    (req, res) => {
        Helpers.ResponseHandler(200, res, 'Protected Route Service');
    },
);

module.exports = router;
