const Joi = require('@hapi/joi');
const Helpers = require('../../../../helpers');
const Services = require('../../../../services');


const checkRequestBody = (body) => new Promise(((resolve, reject) => {
    const schema = Joi.object().keys({
        username: Joi.string(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{12,30}$/).required()
    });

    const result = Joi.validate(body, schema);
    const { error } = result;
    if (error) {
        const { details } = error;
        const e = {
            code: 400,
            msg: details
        };
        reject(e);
        return;
    }
    const {
        username, password
    } = body;
    const data = {
        username: Helpers.Utils.stringToLowerCase(username),
        password
    };
    resolve(data);
}));


async function loginUser(req, res) {
    const { body } = req;
    try {
        const arg = await checkRequestBody(body);
        const { username, password } = arg;
        const data = await Services.UserService.login(username, password);
        Helpers.ResponseHandler(200, res, {
            message: 'Login successful',
            data
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = loginUser;
