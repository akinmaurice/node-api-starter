const jwt = require('jsonwebtoken');
const config = require('../../../config');


const key = config.JWT_SECRET_KEY;

const signOptions = {
    issuer: config.AUTH.ISSUER,
    subject: config.AUTH.SUBJECT,
    audience: config.AUTH.AUDIENCE,
    expiresIn: config.AUTH.EXPIRES_IN
};

const verifyOptions = {
    issuer: config.AUTH.ISSUER,
    subject: config.AUTH.SUBJECT,
    audience: config.AUTH.AUDIENCE,
    maxAge: config.AUTH.EXPIRES_IN
};

const generateToken = (user) => new Promise(((resolve, reject) => {
    jwt.sign(user, key, signOptions, (err, token) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(token);
    });
}));


const verifyToken = (token) => new Promise(((resolve, reject) => {
    jwt.verify(token, key, verifyOptions, (err, decoded) => {
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
