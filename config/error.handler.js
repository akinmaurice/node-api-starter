const moment = require('moment');
const Q = require('q');

const errorHandler = (name, error) => {
    const defer = Q.defer();
    const env = process.env.NODE_ENV || 'development';
    const errorObject = {
        error_description: name,
        timestamp: moment().format('LLLL'),
        error
    };
    switch (env) {
            case 'production':
                logger.error(errorObject);
                break;
            case 'development':
                logger.error(errorObject);
                break;
            case 'staging':
                logger.error(errorObject);
                break;
            case 'test':
                break;
            default:
                logger.error(errorObject);
    }
    defer.resolve();
    return defer.promise;
};


module.exports = errorHandler;
