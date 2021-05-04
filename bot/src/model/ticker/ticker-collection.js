const Ticker = require('./ticker');

/**
 * This class represents a collection of Ticker instances
 */
class TickerCollection {
    #tickers;

    /**
     * Constructor
     * @param {Ticker[]} tickers An amount of Ticker instances
     */
    constructor(...tickers) {
        this.#tickers = tickers;
    }

    /**
     * Static constructor
     * @param {object<object>} tickers The tickers returned from Binance
     * @returns {TickerCollection} A TickerCollection instance
     */
    static fromResponse(tickers) {
        const tickersCreated = [];
        for (const ticker in tickers) {
            tickersCreated.push(Ticker.fromResponse(tickers[ticker]));
        }
        return new this(...tickersCreated);
    }

    /**
     * @returns {Ticker[]} The tickers
     */
    toArray() {
        return this.#tickers;
    }
}

module.exports = TickerCollection;
