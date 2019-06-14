const express = require('express');

const { pid } = process;


const expressConfig = require('./config/express');

const port = process.env.PORT || 3023;
const app = express();

require('./lib/database');


expressConfig(app);

app.listen(port);
logger.info(`Server started on Port ${port}`);

process.on('unhandledRejection', (reason, promise) => {
    errorHandler('unhandledRejection', { reason, promise });
});

module.exports = app;
