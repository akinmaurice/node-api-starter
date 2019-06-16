const path = require('path');
const util = require('util');

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');
const staging = require('./env/staging');

const extend = (util)._extend;
const defaults = {
    root: path.normalize(`${__dirname}/..`),
    serviceName: 'Service',
    auth: {
        expiresIn: 24 * 60 * 60,
        audience: 'www.domain.com',
        issuer: 'NodeStarter',
        subject: 'Access Token'
    },
    pagination_limit: 50
};

const environment = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    staging: extend(staging, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];

module.exports = environment;
