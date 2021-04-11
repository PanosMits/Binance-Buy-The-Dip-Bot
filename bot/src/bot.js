require('dotenv').config({ path: '../.env' });
const cron = require('node-cron');
const BinanceBot = require('./bot/binance-bot');

cron.schedule('* * * * * *', () => {
  BinanceBot.run();
});
