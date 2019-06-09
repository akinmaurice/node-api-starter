const Q = require('q');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const query = require('../../queries/auth');
const db = require('../../../config/database');
const { transformUser } = require('../../helpers/transformer');


const checkRequestBody = (body) => {
    const defer = Q.defer();
    const schema = Joi.object().keys({
        username: Joi.string().min(3).max(30)
            .required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{12,30}$/).required()
    });

    const result = Joi.validate(body, schema);
    const { error } = result;
    if (error) {
        const { details } = error;
        defer.reject({
            code: 400,
            msg: details
        });
    } else {
        defer.resolve(true);
    }
    return defer.promise;
};


const getUserFromDB = async(username) => {
    const defer = Q.defer();
    try {
        const user = await db.oneOrNone(query.loginUser, [ username ]);
        if (!user) {
            defer.reject({
                code: 400,
                msg: 'Invalid Username/Email and Password combination'
            });
        } else {
            defer.resolve(user);
        }
    } catch (e) {
        await errorHandler('Get-User-From-Db', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const confirmPassword = (password, salt, hash) => {
    const defer = Q.defer();
    bcrypt.hash(password, salt, async(err, passwordHash) => {
        if (err) {
            await errorHandler('Hash-Password-Error', err);
            defer.reject({
                code: 500,
                msg: 'Unknown Error'
            });
        } else if (passwordHash !== hash) {
            defer.reject({
                code: 400,
                msg: 'Invalid Username/Email and Password combination'
            });
        } else {
            defer.resolve(true);
        }
    });
    return defer.promise;
};


async function loginUser(req, res) {
    const { body } = req;
    const { username, password } = body;
    try {
        await checkRequestBody(body);
        const user = await getUserFromDB(username);
        const { hash, salt } = user;
        await confirmPassword(password, salt, hash);
        const user_details = transformUser(user);
        res.status(200).json({
            message: 'Login successful',
            data: user_details
        });
    } catch (e) {
        res.status(e.code).json({
            url: req.originalUrl,
            message: e.msg
        });
    }
}


module.exports = loginUser;
