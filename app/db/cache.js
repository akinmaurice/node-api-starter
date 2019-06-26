const redisClient = require('../../lib/redis');


const saveKey = (arg, key, data) => new Promise((async(resolve, reject) => {
    try {
        await redisClient.hsetAsync(arg, key, JSON.stringify(data));
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


const getKey = (arg, key = '') => new Promise((async(resolve, reject) => {
    try {
        const result = await redisClient.hgetAsync(arg, key);
        const data = JSON.parse(result);
        resolve(data);
    } catch (e) {
        reject(e);
    }
}));


const removeKey = (arg, key = '') => new Promise((async(resolve, reject) => {
    try {
        await redisClient.hdelAsync(arg, key);
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


module.exports = {
    saveKey,
    getKey,
    removeKey
};
