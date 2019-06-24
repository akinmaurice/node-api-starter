const express = require('express');

const router = express.Router();

const user = require('./user');
const auth = require('./auth');

router.get(
    '/',
    (req, res) => {
        res.status(200).json({ message: 'Service' });
    },
);


router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
