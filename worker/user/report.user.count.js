const { fork } = require('child_process');


const reportUserCount = () => {
    const getUserCount = fork(`${__dirname}/../../app/scripts/user/user.count.js`);
    getUserCount.send('start');
    getUserCount.on('message', (result) => {
        const { count } = result;
        logger.info(`Total number of Users: ${count}`);
    });
};


module.exports = reportUserCount;
