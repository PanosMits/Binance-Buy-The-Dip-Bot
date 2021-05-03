const Candlestick = require('./candlestick');

/**
 * This class represents a collection of Candlestick instances
 */
class CandlestickCollection {
    #timeframe;

    #candlesticks;

    /**
     * Constructor
     * @param {string} timeframe The timeframe the candlestickCollection represents
     * @param {array} candlesticks An amount of Market instances
     */
    constructor(timeframe, ...candlesticks) {
        this.#timeframe = timeframe;
        this.#candlesticks = candlesticks;
    }

    /**
     * Static constructor
     * @param {string} timeframe The timeframe the candlestickCollection represents
     * @param {Array<Array<number, number, number, number, number, number>} candlesticks
     * @returns {CandlestickCollection} A CandlestickCollection instance
     */
    static fromResponse(timeframe, candlesticks) {
        const candlesticksCreated = candlesticks.map((candlestick) => {
            return Candlestick.fromResponse(candlestick);
        });
        return new this(timeframe, ...candlesticksCreated);
    }

    /**
     * Turn the collection into an object
     * @returns {object} The collection as an object
     */
    toObject() {
        return { timeframe: this.#timeframe, candlesticks: this.#candlesticks };
    }

    /**
     * NOTE: This might not be accurate for every frametime, but it works for the 5m timeframe and this will do for now
     * Gets the timestamp 24 hours ago
     * @returns {number} The timestamp 24 hours ago
     */
    get24HourTimestamp() {
        const lastCandlestickTimestamp = this.#candlesticks[this.#candlesticks.length - 1].timestamp;
        return lastCandlestickTimestamp - (24 * 60 * 60 * 1000);
    }
}

module.exports = CandlestickCollection;
