require('dotenv').config();
const express = require('express');


const expressConfig = require('./config/express');


const config = require('./config');
const worker = require('./worker');


const port = process.env.PORT || 3023;
const app = express();
expressConfig(app);

require('./lib/database');


app.listen(port);
logger.info(`Server started on Port ${port}`);

worker(config);

process.on('unhandledRejection', (reason) => {
    errorHandler('unhandledRejection', reason);
});

module.exports = app;
