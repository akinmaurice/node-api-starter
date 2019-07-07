const Joi = require('@hapi/joi');
const Helpers = require('../../helpers');
const Modules = require('../../modules');


const checkRequestBody = (body) => new Promise(((resolve, reject) => {
    const schema = Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9]{12,30}$/).required(),
        confirm_password: Joi.ref('password')
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
    resolve(true);
}));


async function changePassword(req, res) {
    const { body, query: { token } } = req;
    try {
        await checkRequestBody(body);
        const { password } = body;
        const arg = {
            token,
            password
        };
        const data = await Modules.UserModule.changePassword(arg);
        Helpers.ResponseHandler(200, res, {
            message: 'Password changed successfully',
            data
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = changePassword;
