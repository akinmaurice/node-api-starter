const errorHandler = (name, error) => new Promise((async(resolve, reject) => {
    const { reason } = error;
    logger.error(`${name}: ${reason}`);
    resolve(true);
}));


module.exports = errorHandler;
