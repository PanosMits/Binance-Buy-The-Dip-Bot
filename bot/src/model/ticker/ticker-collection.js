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
     * Gets the top 5 tickers with -9% or less percentage change
     * @returns {Ticker[]} An array of tickers ordered based on the percentage change
     *  biggest drop first
     */
    getBiggestNegativePercentages() {
        return this.#tickers
            .filter((ticker) => ticker.percentageChange <= -9)
            .slice(0, 5)
            .sort((ticker, nextTicker) => ticker.percentageChange - nextTicker.percentageChange);
    }
}

module.exports = TickerCollection;
