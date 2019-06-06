const express = require('express');

const { pid } = process;


const expressConfig = require('./config/express');

const port = process.env.PORT || 3023;
const app = express();

require('./config/database');


expressConfig(app);

app.listen(port);
logger.info(`Server started for Process ${pid} on Port ${port}`);

module.exports = app;
