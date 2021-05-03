/**
 * This class represents a Market
 */
class Market {
    base;

    quote;

    spot;

    symbol;

    active;

    /**
     * @param {string} base The base currency of the market
     * @param {string} quote The quote currency of the market
     * @param {boolean} spot Whether the market is availbe on spot trading or not
     * @param {string} symbol The market's symbol. It's always in the format of base/quote
     * @param {boolean} active Whether the market is active or not
     */
    constructor(base, quote, spot, symbol, active) {
        this.base = base;
        this.quote = quote;
        this.spot = spot;
        this.symbol = symbol;
        this.active = active;
    }

    /**
     * Static constructor
     * @param {object} marketConfig The market details
     * @returns {Market} The market instance
     */
    static fromResponse(marketConfig) {
        return new this(
            marketConfig.base,
            marketConfig.quote,
            marketConfig.spot,
            marketConfig.symbol,
            marketConfig.active,
        );
    }

    /**
     * Checks if the trading market is by USDT
     * @returns {boolean} true if it is, otherwise false
     */
    isDollarMarket() {
        return (this.quote === 'USDT' && this.spot === true && this.active === true) ? true : false;
    }
}

module.exports = Market;
