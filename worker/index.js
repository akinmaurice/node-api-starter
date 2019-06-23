const cron = require('node-cron');
const { fork } = require('child_process');


const reportUserCount = (scheduler) => {
    cron.schedule(
        scheduler.reportUserCount,
        () => {
            const getUserCount = fork(`${__dirname}/../app/jobs/user.count.js`);
            getUserCount.send('start');
            getUserCount.on('message', (result) => {
                const { count } = result;
                logger.info(`Total number of Users: ${count}`);
            });
        }
    );
};


const worker = (config) => {
    reportUserCount(config);
};

module.exports = worker;
