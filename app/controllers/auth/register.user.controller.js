const Q = require('q');
const Joi = require('@hapi/joi');
const query = require('../../queries/auth');
const db = require('../../../config/database');


const checkRequestBody = (body) => {
    const defer = Q.defer();
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30)
            .required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        date_of_birth: Joi.date().max('1-1-2004').iso()
            .required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required()
    });

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


async function registerUser(req, res) {
    const { body } = req;
    const { email, username } = body;
    try {
        await checkRequestBody(body);
        await verifyUserName(username);
        await verifyUserEmail(email);
        res.status(200).json({
            message: 'Successfully registered user account',
            data: body
        });
    } catch (e) {
        res.status(e.code).json({
            url: req.originalUrl,
            message: e.msg
        });
    }
}


module.exports = registerUser;
