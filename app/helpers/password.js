const bcrypt = require('bcrypt');

const saltRounds = 10;


const hashUserPassword = (password) => new Promise(((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (e, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            if (err) {
                reject(err);
                return;
            }
            const passwordData = {
                salt,
                hash
            };
            resolve(passwordData);
        });
    });
}));


const verifyPassword = (password, hash, salt) => new Promise(((resolve, reject) => {
    bcrypt.hash(password, salt, async(err, passwordHash) => {
        if (err) {
            reject(err);
            return;
        }
        if (passwordHash !== hash) {
            resolve(false);
            return;
        }
        resolve(true);
    });
}));


module.exports = {
    hashUserPassword,
    verifyPassword
};
