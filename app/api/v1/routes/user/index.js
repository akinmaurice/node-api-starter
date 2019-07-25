const express = require('express');

const router = express.Router();

const MiddleWare = require('../../../../middleware');
const Controllers = require('../../controllers');


router.put(
    '/password',
    MiddleWare.Auth.extractUser,
    Controllers.AuthController.updatePassword
);


router.get(
    '/protected',
    MiddleWare.Auth.extractUser,
    (req, res) => {
        res.status(200).json({
            status: true,
            data: 'Protected Route Service'
        });
    },
);

module.exports = router;
