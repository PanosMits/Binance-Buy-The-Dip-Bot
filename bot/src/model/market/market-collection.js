const Market = require('./market');

/**
 * This class represents a collection of Market instances
 */
class MarketCollection {
    #markets;

    /**
     * Constructor
     * @param {Market[]} markets An amount of Market instances
     */
    constructor(...markets) {
        this.#markets = markets;
    }

    /**
     * Static constructor
     * @param {object<object>} markets The markets returned from Binance
     * @returns {MarketCollection} A MarketCollection instance
     */
    static fromResponse(markets) {
        const marketsCreated = [];
        for (const market in markets) {
            marketsCreated.push(Market.fromResponse(markets[market]));
        }
        return new this(...marketsCreated);
    }

    /**
     * Creates a MarketCollection from an array of Market instances
     * @param {Market[]} markets
     * @returns An MarketCollection with the Market instances provided
     */
    static fromArray(markets) {
        return new this(...markets);
    }

    /**
     * Filters out any non-USDT Market instance
     * @returns {MarketCollection} An MarketCollection containing only the USDT markets
     */
    getDollarMarkets() {
        return MarketCollection.fromArray(this.#markets.filter((market) => market.isDollarMarket()));
    }

    /**
     * Get an array with all the market symbols
     * @returns {string[]} An array with all the market symbols
     */
    getMarketSymbols() {
        return this.#markets.map((market) => market.symbol);
    }

    /**
     * @returns {Market[]} The markets
     */
    toArray() {
        return this.#markets;
    }
}

module.exports = MarketCollection;
