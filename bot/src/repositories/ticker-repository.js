const BinanceClient = require('../model/binance-client');
const Ticker = require('../model/ticker/ticker');
const TickerCollection = require('../model/ticker/ticker-collection');

class TickerRepository {
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
     * Gets ticker data for a ticker
     * @param {string} ticker The market symbol(ticker) we want the ticker data for 
     * @returns {Ticker} A Ticker instance
     */
    async getTicker(ticker) {
        const response = await this.#binanceClient.fetchTicker(ticker);
        return Ticker.fromResponse(response);
    }

    /**
     * Gets ticker data for a set of tickers
     * @param {string[]} tickers The tickers we want the data for
     * @returns {TickerCollection} The ticker data
     */
    async getTickers(tickers) {
        const response = await this.#binanceClient.fetchTickers(tickers);
        return TickerCollection.fromResponse(response);
    }
}

module.exports = new TickerRepository(BinanceClient.getInstance());
