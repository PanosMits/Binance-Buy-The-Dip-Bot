/**
 * This class represents a Market
 */
class Market {
    base;

    quote;

    spot;

    constructor(base, quote, spot) {
        this.base = base;
        this.quote = quote;
        this.spot = spot;
    }

    /**
     * Static constructor
     * @param {object} marketConfig The market details
     * @returns {Market} The market instance
     */
    static fromResponse(marketConfig) {
        return new this(marketConfig.base, marketConfig.quote, marketConfig.spot);
    }

    /**
     * Checks if the trading market is by USDT
     * @returns {boolean} true if it is, otherwise false
     */
    isDollarMarket() {
        return (this.quote === 'USDT' && this.spot === true) ? true : false;
    }
}

module.exports = Market;
