const express = require('express');

const router = express.Router();

const MiddleWare = require('../middleware');
const Helpers = require('../helpers');


router.get(
    '/protected',
    MiddleWare.Auth.extractUser,
    (req, res) => {
        Helpers.ResponseHandler(200, res, 'Protected Route Service');
    },
);

module.exports = router;
