const redisClient = require('../../lib/redis');


const saveKey = (arg, key, data) => new Promise(((resolve, reject) => {
    redisClient.hset(arg, key, JSON.stringify(data), (err, resp) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(resp);
    });
}));


const getKey = (arg, key = '') => new Promise(((resolve, reject) => {
    redisClient.hget(arg, key, (err, result) => {
        if (err) {
            reject(err);
            return;
        }
        const data = JSON.parse(result);
        resolve(data);
    });
}));


const removeKey = (arg, key = '') => new Promise(((resolve, reject) => {
    redisClient.hdel(arg, key, (err, result) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(result);
    });
}));


module.exports = {
    saveKey,
    getKey,
    removeKey
};
