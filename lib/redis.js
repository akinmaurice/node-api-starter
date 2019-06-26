const redis = require('redis');
const config = require('../config');


const redisClient = redis.createClient(config.REDIS_URI);


module.exports = redisClient;
