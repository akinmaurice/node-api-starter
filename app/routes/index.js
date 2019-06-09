const express = require('express');


const router = express.Router();

const auth = require('../middleware/authorization.server.controller');


router.get(
    '/',
    (req, res) => {
        res.status(200).json({ message: 'Service' });
    },
);


router.get(
    '/protected',
    auth.extractUser,
    (req, res) => {
        res.status(200).json({ message: 'Protected Service Route' });
    },
);

module.exports = router;
