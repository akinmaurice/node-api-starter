const Q = require('q');
const Joi = require('@hapi/joi');
const UserService = require('../../services/user');


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


async function registerUser(req, res) {
    const { body } = req;
    const { email, username } = body;
    try {
        await checkRequestBody(body);
        await UserService.register(body);
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
