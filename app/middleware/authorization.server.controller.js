const { verifyToken } = require('../helpers/token');


const extractUser = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization;
        verifyToken(token)
            .then((user) => {
                req.user = user;
                return next();
            })
            .catch(() => res.status(403).json({
                message: 'User is not authorized'
            }));
    } else {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }
};


module.exports = { extractUser };
