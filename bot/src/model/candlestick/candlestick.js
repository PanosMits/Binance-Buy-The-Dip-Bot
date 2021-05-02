/**
 * This class represents a Candlestick
 */
class Candlestick {
    timestamp;

    open;

    high;

    low;

    close;

    /**
     * @param {number} timestamp The timestamp of the candlestick
     * @param {number} open The open price of the candlestick
     * @param {number} high The high price of the candlestick
     * @param {number} low The low price of the candlestick
     * @param {number} close The close price of the candlestick
     */
    constructor(timestamp, open, high, low, close) {
        this.timestamp = timestamp;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
    }

    /**
     * Static constructor
     * @param {array} candlestickConfig The candlestick details
     * @returns {Candlestick} The Candlestick instance
     */
    static fromResponse(candlestickConfig) {
        return new this(
            candlestickConfig[0],
            candlestickConfig[1],
            candlestickConfig[2],
            candlestickConfig[3],
            candlestickConfig[4],
        );
    }
}

module.exports = Candlestick;
