const Q = require('q');
const Joi = require('@hapi/joi');
const UserService = require('../../services/user');


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


async function loginUser(req, res) {
    const { body } = req;
    const { username, password } = body;
    try {
        await checkRequestBody(body);
        const data = await UserService.login(username, password);
        res.status(200).json({
            message: 'Login successful',
            data
        });
    } catch (e) {
        res.status(e.code).json({
            url: req.originalUrl,
            message: e.msg
        });
    }
}


module.exports = loginUser;
