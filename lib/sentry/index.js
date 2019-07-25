const Sentry = require('@sentry/node');

const config = require('../../config');

const { SENTRY_URI, NODE_ENV } = config;
Sentry.init({
    dsn: SENTRY_URI,
    environment: NODE_ENV || 'development'
});


module.exports = Sentry;
