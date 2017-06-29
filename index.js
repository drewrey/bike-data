const sobiBikes = require('./sobiClient.js');
const CronJob = require('cron').CronJob;

var sobi = new CronJob({
    cronTime: '00 */15 * * * *',
    onTick: sobiBikes()
});

sobi.start();

