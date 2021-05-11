/**
 * This class represents a Ticker
 */
class Ticker {
    symbol;

    percentageChange;

    bidPrice;

    askPrice;

    /**
     * @param {string} symbol The ticker's symbol
     * @param {number} percentageChange The 24 hour percentage change
     * @param {number} bidPrice The bid price - The best available price I can sell a crypto at
     * @param {number} askPrice The ask price - The best available price I can buy a crypto at
     */
    constructor(symbol, percentageChange, bidPrice, askPrice) {
        this.symbol = symbol;
        this.percentageChange = percentageChange;
        this.bidPrice = bidPrice;
        this.askPrice = askPrice;
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
            tickerConfig.ask,
        );
    }
}

module.exports = Ticker;
