const Sentry = require('@sentry/node');

const config = require('../config');

const { SENTRY_URI } = config;
Sentry.init({ dsn: SENTRY_URI });


module.exports = Sentry;
