const BinanceClient = require('../model/binance-client');

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
     * @returns {} The ticker data
     */
    async getTicker(ticker) {
        return this.#binanceClient.fetchTicker(ticker);
    }

    /**
     * Gets ticker data for a set of tickers
     * @param {string[]} tickers The tickers we want the data for
     * @returns {object} The ticker data
     */
    async getTickers(tickers) {
        return this.#binanceClient.fetchTickers(tickers);
    }
}

module.exports = new TickerRepository(BinanceClient.getInstance());
