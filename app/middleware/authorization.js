const Helpers = require('../helpers');


const extractUser = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization;
        Helpers.Token.verifyToken(token)
            .then((user) => {
                req.user = user;
                return next();
            })
            .catch(() => {
                Helpers.ResponseHandler(401, res, 'User is not authorized');
            });
    } else {
        Helpers.ResponseHandler(403, res, 'User is not authenticated');
    }
};


module.exports = { extractUser };
