const Helpers = require('../../../../helpers');
const Services = require('../../../../services');


async function verifyPasswordReset(req, res) {
    const { query: { token } } = req;
    try {
        const user = await Services.UserService.verifyPasswordReset(token);
        Helpers.ResponseHandler(200, res, {
            message: 'Successfully verified token',
            user
        });
    } catch (e) {
        Helpers.ResponseHandler(e.code, res, e.msg);
    }
}


module.exports = verifyPasswordReset;
