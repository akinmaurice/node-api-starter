const Q = require('q');


// eslint-disable-next-line no-underscore-dangle
const _findStackTrace = (error) => {
    if (error.stack) {
        return error.stack;
    }
    const results = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in error) {
        // eslint-disable-next-line no-prototype-builtins
        if (error.hasOwnProperty(prop) && typeof error[prop] === 'object') {
            const result = _findStackTrace(error[prop]);

            if (result) {
                results.push(result);
            }
        }
    }
    return JSON.stringify(results);
};


const errorHandler = (name, error) => {
    const defer = Q.defer();
    const env = process.env.NODE_ENV || 'development';

    switch (env) {
            case 'production':
                logger.error(error);
                break;
            case 'development':
                logger.error(error);
                break;
            case 'staging':
                logger.error(error);
                break;
            case 'test':
                break;
            default:
                logger.error(error);
    }
    defer.resolve();
    return defer.promise;
};


module.exports = errorHandler;
