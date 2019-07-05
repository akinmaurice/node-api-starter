const Helpers = require('../../helpers');
const Modules = require('../../modules');


async function activateUser(req, res) {
    const { params: { token } } = req;
    try {
        const user = await Modules.UserModule.activateAccount(token);
        Helpers.ResponseHandler(200, res, {
            message: 'Successfully activated user account',
            user
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = activateUser;
