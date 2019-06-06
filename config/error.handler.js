const moment = require('moment');

const errorHandler = (name, error) => {
    const env = process.env.NODE_ENV || 'development';
    const timestamp = moment();
    const errorObject = {
        error_name: name,
        timestamp,
        error,
        env
    };
    switch (env) {
            case 'production':
                // DO something for prod
                break;
            case 'development':
                // Do Something for dev
                break;
            case 'staging':
                // DO Something for staging
                break;
            case 'test':
                // DO Something for test
                break;
            default:
                // Do something by Default
    }
};


module.exports = errorHandler;
