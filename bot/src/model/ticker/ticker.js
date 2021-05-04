/**
 * This class represents a Ticker
 */
class Ticker {
    symbol;

    percentageChange;

    /**
     * @param {string} symbol The ticker's symbol
     * @param {number} percentageChange The 24 hour percentage change
     */
    constructor(symbol, percentageChange) {
        this.symbol = symbol;
        this.percentageChange = percentageChange;
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
        );
    }
}

module.exports = Ticker;
