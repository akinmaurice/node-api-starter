const path = require('path');
const util = require('util');

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');
const staging = require('./env/staging');
const scheduler = require('./scheduler');

const extend = (util)._extend;
const defaults = {
    root: path.normalize(`${__dirname}/..`),
    SERVICE_NAME: 'Service',
    AUTH: {
        EXPIRES_IN: 24 * 60 * 60,
        AUDIENCE: 'www.domain.com',
        ISSUER: 'NodeStarter',
        SUBJECT: 'Access Token'
    },
    VERIFICATION_CODE_EXPIRY: 24 * 60 * 60, // seconds,
    PAGINATION_LIMIT: 50,
    INITIALIZATION_VECTOR_LENGTH: 16,
    SCHEDULER: {
        REPORT_USER_COUNT: scheduler.reportUserCount
    },
    CACHE: {
        TOKEN_CACHE: 'token_cache'
    }
};

const environment = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    staging: extend(staging, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];

module.exports = environment;
