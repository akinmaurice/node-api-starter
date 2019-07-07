const Helpers = require('../../helpers');
const Modules = require('../../modules');


async function verifyPasswordReset(req, res) {
    const { query: { token } } = req;
    try {
        const user = await Modules.UserModule.verifyPasswordReset(token);
        Helpers.ResponseHandler(200, res, {
            message: 'Successfully verified token',
            user
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = verifyPasswordReset;
