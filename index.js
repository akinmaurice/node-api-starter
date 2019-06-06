const express = require('express');

const { pid } = process;


const expressConfig = require('./config/express');

const port = process.env.PORT || 3023;
const app = express();

require('./config/database');


expressConfig(app);

app.listen(port);
logger.info(`Server started for Process ${pid} on Port ${port}`);

process.on('unhandledRejection', (reason, p) => {
    errorHandler('unhandledRejection', { reason, promise: p });
});

process.on('uncaughtException', (err) => {
    errorHandler('uncaughtException', err);
});

module.exports = app;
