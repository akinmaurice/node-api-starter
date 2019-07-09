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


const verifyPassword = (password, hash) => new Promise(((resolve, reject) => {
    bcrypt.compare(password, hash, (err, response) => {
        if (err) {
            reject(err);
            return;
        }
        if (!response) {
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
