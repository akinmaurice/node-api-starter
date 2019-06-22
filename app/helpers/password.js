const Q = require('q');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const hashUserPassword = (password) => {
    const defer = Q.defer();
    bcrypt.genSalt(saltRounds, (e, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            if (err) {
                defer.reject(err);
            } else {
                const passwordData = {
                    salt,
                    hash
                };
                defer.resolve(passwordData);
            }
        });
    });
    return defer.promise;
};


const verifyPassword = (password, hash, salt) => {
    const defer = Q.defer();
    bcrypt.hash(password, salt, async(err, passwordHash) => {
        if (err) {
            defer.reject(err);
        } else if (passwordHash !== hash) {
            defer.resolve(false);
        } else {
            defer.resolve(true);
        }
    });
    return defer.promise;
};


module.exports = {
    hashUserPassword,
    verifyPassword
};
