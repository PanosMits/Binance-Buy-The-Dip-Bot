/**
 * This model class holds information about a market's ohlc prices
 */
class MarketCandlestickResult {
    #symbol

    #candlestickCollection

    /**
     * 
     * @param {string} symbol The symbol of the market the candlesticks are about
     * @param {CandlestickCollection} candlestickCollection The candlestick data
     */
    constructor(symbol, candlestickCollection) {
        this.#symbol = symbol;
        this.#candlestickCollection = candlestickCollection;
    }

    /**
     * Turn the class object into a JS object
     * @returns {object} The class object as a JS object
     */
    toObject() {
        return {
            symbol: this.#symbol,
            candlestickCollection: this.#candlestickCollection,
        };
    }
}

module.exports = MarketCandlestickResult;
