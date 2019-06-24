const express = require('express');


const expressConfig = require('./config/express');

const config = require('./config');
const worker = require('./worker');

const port = process.env.PORT || 3023;
const app = express();

require('./lib/database');


expressConfig(app);

app.listen(port);
logger.info(`Server started on Port ${port}`);

worker(config);

process.on('unhandledRejection', (reason, promise) => {
    errorHandler('unhandledRejection', { reason, promise });
});

module.exports = app;
