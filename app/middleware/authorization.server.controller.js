const jwt = require('jsonwebtoken');
const config = require('../../config');


const verifyOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    audience: config.auth.audience,
    maxAge: config.auth.expiresIn
};


const extractUser = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, config.JWT_SECRET_KEY, verifyOptions, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
            req.user = decoded;
            return next();
        });
    } else {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }
};


module.exports = { extractUser };
