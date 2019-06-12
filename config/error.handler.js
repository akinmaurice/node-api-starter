const Q = require('q');

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
