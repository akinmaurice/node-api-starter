const Joi = require('@hapi/joi');
const Helpers = require('../../../../helpers');
const Services = require('../../../../services');


const checkRequestBody = (body) => new Promise(((resolve, reject) => {
    const schema = Joi.object().keys({
        old_password: Joi.string(),
        new_password: Joi.string().regex(/^[a-zA-Z0-9]{12,30}$/).required(),
        confirm_password: Joi.ref('new_password')
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
        old_password,
        new_password
    } = body;
    const data = {
        old_password,
        new_password
    };
    resolve(data);
}));


async function updatePassword(req, res) {
    const { body, user } = req;
    try {
        const { id: user_id } = user;
        const arg = await checkRequestBody(body);
        const { old_password, new_password } = arg;
        await Services.UserService.updatePassword(user_id, new_password, old_password);
        Helpers.ResponseHandler(201, res, {
            message: 'Successfully updated password'
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = updatePassword;
