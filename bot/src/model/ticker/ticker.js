/**
 * This class represents a Ticker
 */
class Ticker {
    symbol;

    percentageChange;

    bidPrice;

    /**
     * @param {string} symbol The ticker's symbol
     * @param {number} percentageChange The 24 hour percentage change
     * @param {number} bidPrice The bid price - The best available I can sell a crypto at
     */
    constructor(symbol, percentageChange, bidPrice) {
        this.symbol = symbol;
        this.percentageChange = percentageChange;
        this.bidPrice = bidPrice;
    }

    /**
     * Static constructor
     * @param {object} tickerConfig The ticker details
     * @returns {Ticker} The Ticker instance
     */
    static fromResponse(tickerConfig) {
        return new this(
            tickerConfig.symbol,
            tickerConfig.percentage,
            tickerConfig.bid,
        );
    }
}

module.exports = Ticker;
