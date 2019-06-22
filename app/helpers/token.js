const jwt = require('jsonwebtoken');
const Q = require('q');
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

const generateToken = (user) => {
    const defer = Q.defer();
    jwt.sign(user, config.JWT_SECRET_KEY, signOptions, (err, token) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(token);
        }
    });
    return defer.promise;
};


const verifyToken = (token) => {
    const defer = Q.defer();
    jwt.verify(token, config.JWT_SECRET_KEY, verifyOptions, (err, decoded) => {
        if (err) {
            defer.reject(false);
        }
        defer.resolve(decoded);
    });
    return defer.promise;
};

module.exports = {
    generateToken,
    verifyToken
};
