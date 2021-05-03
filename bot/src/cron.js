require('dotenv').config({ path: '../.env' });
const cron = require('node-cron');
const BinanceBot = require('./bot/binance-bot');

cron.schedule('0 */5 * * * *', () => {
    BinanceBot.run();
});
