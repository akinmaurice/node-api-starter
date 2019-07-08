const { fork } = require('child_process');


const reportUserCount = () => new Promise((async(resolve, reject) => {
    logger.debug('Starting Child Process');

    const getUserCount = fork(`${__dirname}/../../app/scripts/user/user.count.js`);

    getUserCount.send('start');

    getUserCount.on('message', (result) => {
        const { count } = result;
        logger.info(`Total number of Users: ${count}`);
        logger.debug('Killing Child Process');
        getUserCount.kill();
        logger.debug('Child Process Killed');
        resolve(true);
    });

    getUserCount.on('exit', (error) => {
        logger.error(`Report User Count Child Process Error ${error}`);
        const err = {
            status: false
        };
        reject(err);
    });
}));


module.exports = reportUserCount;
