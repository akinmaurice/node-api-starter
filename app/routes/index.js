const express = require('express');

const router = express.Router();
const Helpers = require('../helpers');

const user = require('./user');
const auth = require('./auth');

router.get(
    '/',
    (req, res) => {
        Helpers.ResponseHandler(200, res, 'Service');
    },
);


router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
