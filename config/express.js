const fs = require('fs');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const FileStreamRotator = require('file-stream-rotator');

require('../lib/sentry');
const starterInit = require('./starter');

const errorHandler = require('./error');
const loggerInit = require('./logger');
const routes = require('../app/api');
const Helpers = require('../app/helpers');


const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressConfig = (app) => {
    let accessLogStream,
        logger;

    if (app.get('env') === 'development') {
        logger = loggerInit('development');
    } else if (app.get('env') === 'production') {
        logger = loggerInit('production');
    } else if (app.get('env') === 'test') {
        logger = loggerInit('test');
    } else if (app.get('env') === 'staging') {
        logger = loggerInit('staging');
    } else {
        logger = loggerInit();
    }

    global.logger = logger;
    logger.info('Application starting...');
    logger.debug("Overriding 'Express' logger");

    global.errorHandler = errorHandler;

    if (checkLogDir) {
        accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logDirectory}/server-%DATE%.log`,
            frequency: 'weekly',
            verbose: false
        });
    }


    app.use(morgan('combined', { stream: accessLogStream }));


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    app.use(helmet());
    app.disable('x-powered-by');

    app.use(starterInit.corsInit());


    app.use(starterInit.requestId());

    app.use('/', routes);


    app.use((req, res) => Helpers.ResponseHandler(404, res));


    app.use((err, req, res) => Helpers.ResponseHandler(500, res, err));
};

module.exports = expressConfig;
