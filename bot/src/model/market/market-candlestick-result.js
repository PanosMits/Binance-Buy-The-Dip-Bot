const PercentageChangeCalculator = require('../../services/percentage-change-calculator');

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

    /**
     * Gets the 24 hour difference for the market
     */
    getMarket24HourDifference() {
        const candlesticks = this.#candlestickCollection.toObject().candlesticks;
        const latestCandlestick = candlesticks[candlesticks.length - 1];
        const twentyFourHoursTimestamp = this.#candlestickCollection.get24HourTimestamp();
        const candleStick24HoursAgo = candlesticks.filter((candlestick) => candlestick.timestamp === twentyFourHoursTimestamp)[0];
        return PercentageChangeCalculator.calculate(candleStick24HoursAgo.close, latestCandlestick.close);
    }
}

module.exports = MarketCandlestickResult;
