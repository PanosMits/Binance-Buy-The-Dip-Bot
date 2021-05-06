const CalculatorService = require('../../services/calculator-service');

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
     * @returns {number} The difference in percentage for the last 24 hours
     */
    getMarket24HourDifference() {
        const candlesticks = this.#candlestickCollection.toObject().candlesticks;
        const latestCandlestick = candlesticks[candlesticks.length - 1];
        const twentyFourHoursTimestamp = this.#candlestickCollection.get24HourTimestamp();
        const candleStick24HoursAgo = candlesticks.filter((candlestick) => candlestick.timestamp === twentyFourHoursTimestamp)[0];
        return CalculatorService.calculatePercentageDifference(candleStick24HoursAgo.close, latestCandlestick.close);

        // TODO: This might break sometimes when a new pair is added to BinanceSome markets do not have enough ohlcv data.
        // because there won't be enough ohlcv data
        // Fix:
        // if (candleStick24HoursAgo) {
        // return PercentageChangeCalculator.calculate(candleStick24HoursAgo.close, latestCandlestick.close);
        // }
        // return undefined;
    }
}

module.exports = MarketCandlestickResult;
