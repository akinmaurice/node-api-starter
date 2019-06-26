const UserService = require('../../services/user');


async function activateUser(req, res) {
    const { params: { token } } = req;
    try {
        const user = await UserService.activateAccount(token);
        res.status(201).json({
            message: 'Successfully activated user account',
            data: user
        });
    } catch (e) {
        res.status(e.code).json({
            url: req.originalUrl,
            message: e.msg
        });
    }
}


module.exports = activateUser;
