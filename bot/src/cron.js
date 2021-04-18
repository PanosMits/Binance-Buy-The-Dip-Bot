require('dotenv').config({ path: '../.env' });
const cron = require('node-cron');
const BinanceBot = require('./bot/binance-bot');

// cron.schedule('* * * * * *', () => {
BinanceBot.run();
// });


// **************************************************************** //
// **************************************************************** //
// **************************************************************** //


// (async () => {
//   const exchange = new ccxt.binance();
//   const markets = await exchange.loadMarkets();
//   const ohlc = await exchange.fetchOHLCV('BTC/USDT', '1m', undefined, 1000); // Get last 1000 minutes ohlc

//   console.log(markets);
//   // console.log(ohlc);
// })()


// **************************************************************** //
// **************************************************************** //
// **************************************************************** //
