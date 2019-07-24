const redisClient = require('../../lib/redis');


/**
 * @async
 * @description This function saves data to redis cache
 * @param arg {string} cache name to save data to
 * @param key {string} key identifying the data to save
 * @param data {Object} data to save to cache
 * @returns {Boolean}  true if data is saved
 * @throws {e} Error Response
 */
const saveKey = (arg, key, data) => new Promise((async(resolve, reject) => {
    try {
        await redisClient.hsetAsync(arg, key, JSON.stringify(data));
        resolve(true);
    } catch (e) {
        reject(e);
    }
}));


/**
 * @async
 * @description This function retrieves data from redis cache
 * @param arg {string} cache name to fetch data from
 * @param key {string} key identifying the data to fetch
 * @returns {Object}  The data retrieved from the cache
 * @throws {e} Error Response
 */
const getKey = (arg, key = '') => new Promise((async(resolve, reject) => {
    try {
        const result = await redisClient.hgetAsync(arg, key);
        const data = JSON.parse(result);
        resolve(data);
    } catch (e) {
        reject(e);
    }
}));


/**
 * @async
 * @description This function deletes data from redis cache
 * @param arg {string} cache name to delete data from
 * @param key {string} key identifying the data to delete
 * @returns {Boolean}  true if data is deleted
 * @throws {e} Error Response
 */
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
