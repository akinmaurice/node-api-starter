const errorHandler = (name, error) => new Promise((async(resolve, reject) => {
    if (!name) {
        const e = {
            err: 'Provide a valid error name'
        };
        reject(e);
        return;
    }
    logger.error(`${name}: ${error}`);
    resolve(true);
}));


module.exports = errorHandler;
