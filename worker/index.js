const cron = require('node-cron');
const UserWorker = require('./user');

const reportUserCount = (scheduler) => {
    cron.schedule(
        scheduler.reportUserCount,
        () => {
            UserWorker.reportUserCount();
        }
    );
};


const worker = (config) => {
    reportUserCount(config);
};

module.exports = worker;
