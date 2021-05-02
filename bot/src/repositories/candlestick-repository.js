const BinanceClient = require('../model/binance-client');
const CandlestickCollection = require('../model/candlestick/candlestick-collection');
const Timeframe = require('../model/enums/timeframe');

class CandlestickRepository {
    #MAX_LIMIT = 5; // TODO: Change it back to 1000

    /**
     *  @param {BinanceClient}
     */
    #binanceClient;

    /**
     * @param {BinanceClient} binanceClient The Binance client
     */
    constructor(binanceClient) {
        this.#binanceClient = binanceClient;
    }

    /**
     * Gets the ohlcv for the market provided
     * @param {string} symbol The market you want the ohlc prices for, e.g. BTC/USDT
     * @param {string} timeframe The timeframe e.g. 1m, 5m, 1h, 1d - defaults to 5m
     * @param {number} since The timestamp indicating the date you want to get the ohlcv prices since - defaults to undefined
     * @param {number} limit The amount of prices returned - max is 1000, defaults to max
     * @returns {CandlestickCollection} A CandlestickCollection instance
     */
    async getCandlesticksForMarket(
        symbol,
        timeframe = Timeframe.FIVE_MINUTES,
        since = undefined,
        limit = this.#MAX_LIMIT
    ) {
        const candlestickData = await this.#binanceClient.fetchOHLCV(symbol, timeframe, since, limit);
        return CandlestickCollection.fromResponse(timeframe, candlestickData);
    }
}

module.exports = new CandlestickRepository(BinanceClient.getInstance());
