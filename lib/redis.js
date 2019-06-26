const redis = require('redis');
const bluebird = require('bluebird');
const config = require('../config');


bluebird.promisifyAll(redis.RedisClient.prototype);
const redisClient = redis.createClient(config.REDIS_URI);


module.exports = redisClient;
