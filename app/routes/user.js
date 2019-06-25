const express = require('express');

const router = express.Router();

const MiddleWare = require('../middleware');


router.get(
    '/protected',
    MiddleWare.Auth.extractUser,
    (req, res) => {
        res.status(200).json({ message: 'Protected Service Route' });
    },
);

module.exports = router;
