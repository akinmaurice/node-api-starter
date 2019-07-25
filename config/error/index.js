const Sentry = require('../../lib/sentry');

const NODE_ENV = process.env.NODE_ENV || 'development';

const logError = (name, error) => new Promise((async(resolve) => {
    logger.error(`${name}: ${error}`);
    resolve(true);
}));


const sendErrorToSentry = (error) => new Promise((async(resolve) => {
    Sentry.captureException(error);
    resolve(true);
}));


const errorHandler = async(name, error) => {
    await logError(name, error);
    if (NODE_ENV === 'production') {
        await sendErrorToSentry(error);
    }
};


module.exports = errorHandler;
