const Q = require('q');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const moment = require('moment');
const query = require('../../queries/auth');
const db = require('../../../config/database');


const saltRounds = 10;


const checkRequestBody = (body) => {
    const defer = Q.defer();
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30)
            .required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{12,30}$/).required(),
        confirm_password: Joi.ref('password'),
        date_of_birth: Joi.date().max('1-1-2004').iso()
            .required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required()
    }).with('password', 'confirm_password');

    const result = Joi.validate(body, schema);
    const { error } = result;
    if (error) {
        const { details } = error;
        defer.reject({
            code: 422,
            msg: details
        });
    } else {
        defer.resolve(true);
    }
    return defer.promise;
};


const verifyUserName = async(username) => {
    const defer = Q.defer();
    try {
        const validateUserName = await db.oneOrNone(query.getUserByUserName, [ username ]);
        if (validateUserName) {
            defer.reject({
                code: 422,
                msg: 'A User with that UserName exists already'
            });
        } else {
            defer.resolve(true);
        }
    } catch (e) {
        await errorHandler('Verify-UserName', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const verifyUserEmail = async(email) => {
    const defer = Q.defer();
    try {
        const validateEmail = await db.oneOrNone(query.getUserByEmail, [ email ]);
        if (validateEmail) {
            defer.reject({
                code: 422,
                msg: 'A User with that Email exists already'
            });
        } else {
            defer.resolve(true);
        }
    } catch (e) {
        await errorHandler('Verify-User-Email', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const hashUserPassword = (password) => {
    const defer = Q.defer();
    bcrypt.genSalt(saltRounds, (e, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            if (err) {
                await errorHandler('Hash-User-Password-Error', err);
                defer.reject({
                    code: 500,
                    msg: 'Unknown Error'
                });
            } else {
                const passwordData = {
                    salt,
                    hash
                };
                defer.resolve(passwordData);
            }
        });
    });
    return defer.promise;
};


const saveUser = async(body, passwordData) => {
    const defer = Q.defer();
    try {
        const { email, username, date_of_birth } = body;
        const { hash, salt } = passwordData;
        const created_at = moment();
        const updated_at = moment();
        const is_verified = true;
        await db.none(query.createUser, [
            username, email, hash, salt, date_of_birth,
            is_verified, created_at, updated_at
        ]);
        defer.resolve(true);
    } catch (e) {
        await errorHandler('Verify-User-Email', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function registerUser(req, res) {
    const { body } = req;
    const { email, username, password } = body;
    try {
        await checkRequestBody(body);
        await verifyUserName(username);
        await verifyUserEmail(email);
        const passwordData = await hashUserPassword(password);
        await saveUser(body, passwordData);
        const user = {
            email,
            username
        };
        res.status(201).json({
            message: 'Successfully registered user account',
            data: user
        });
    } catch (e) {
        res.status(e.code).json({
            url: req.originalUrl,
            message: e.msg
        });
    }
}


module.exports = registerUser;
