const jwt = require('jsonwebtoken');
const config = require('../../config');


const signOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    audience: config.auth.audience,
    expiresIn: config.auth.expiresIn
};

const verifyOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    audience: config.auth.audience,
    maxAge: config.auth.expiresIn
};

const generateToken = (user) => new Promise(((resolve, reject) => {
    jwt.sign(user, config.JWT_SECRET_KEY, signOptions, (err, token) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(token);
    });
}));


const verifyToken = (token) => new Promise(((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET_KEY, verifyOptions, (err, decoded) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(decoded);
    });
}));

module.exports = {
    generateToken,
    verifyToken
};
