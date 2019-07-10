const Joi = require('@hapi/joi');
const Helpers = require('../../helpers');
const Services = require('../../services');


const checkRequestBody = (body) => new Promise(((resolve, reject) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required()
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
        email
    } = body;
    const data = {
        email: Helpers.Utils.stringToLowerCase(email)
    };
    resolve(data);
}));


async function resetPassword(req, res) {
    const { body } = req;
    try {
        const arg = await checkRequestBody(body);
        const { email } = arg;
        const data = await Services.UserService.resetPassword(email);
        Helpers.ResponseHandler(200, res, {
            message: 'Reset Password successful',
            data
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = resetPassword;
