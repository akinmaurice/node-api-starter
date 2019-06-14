const express = require('express');

const { pid } = process;


const expressConfig = require('./config/express');

const port = process.env.PORT || 3023;
const app = express();

require('./lib/database');


expressConfig(app);

app.listen(port);
logger.info(`Server started for Process ${pid} on Port ${port}`);

process.on('unhandledRejection', (reason, promise) => {
    errorHandler('unhandledRejection', { reason, promise });
});

process.on('uncaughtException', (err) => {
    errorHandler('uncaughtException', err);
});

module.exports = app;
