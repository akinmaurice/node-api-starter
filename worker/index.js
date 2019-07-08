const cron = require('node-cron');
const UserWorker = require('./user');


const reportUserCount = (SCHEDULER) => {
    cron.schedule(
        SCHEDULER.REPORT_USER_COUNT,
        () => {
            UserWorker.reportUserCount();
        }
    );
};


const worker = (config) => {
    const { SCHEDULER } = config;
    reportUserCount(SCHEDULER);
};


module.exports = worker;
