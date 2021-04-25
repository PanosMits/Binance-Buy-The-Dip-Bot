const Market = require('./market');

/**
 * This class represents a collection of Market instances
 */
class MarketCollection {
    markets;

    /**
     * Constructor
     * @param {array} markets An amount of Market instances
     */
    constructor(...markets) {
        this.markets = markets;
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
     * Gets all the card from the collection that are used for HLR auto top-ups
     * @returns {array} An array containing the cards
     */
    getDollarMarkets() {
        return this.markets.filter((market) => market.isDollarMarket());
    }
}

module.exports = MarketCollection;
