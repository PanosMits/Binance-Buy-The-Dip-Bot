const { uuid } = require('uuidv4');

/**
 * This class represents an buy order
 */
class BuyOrder {
    orderId

    exchangeOrderId

    symbol

    date

    timezone

    baseAmountBought

    priceBoughtAt

    quoteAmountSpent

    active

    /**
     * @param {string} orderId The ticker's symbol
     * @param {string} exchangeOrderId The ticker's symbol
     * @param {string} symbol The ticker's symbol
     * @param {number} date The ticker's symbol
     * @param {string} timezone The ticker's symbol
     * @param {number} baseAmountBought The 24 hour percentage change
     * @param {number} priceBoughtAt The 24 hour percentage change
     * @param {number} quoteAmountSpent The 24 hour percentage change
     * @param {boolean} active T
     */
    constructor(
        orderId,
        exchangeOrderId,
        symbol,
        date,
        timezone,
        baseAmountBought,
        priceBoughtAt,
        quoteAmountSpent,
        active
    ) {
        this.orderId = orderId;
        this.exchangeOrderId = exchangeOrderId;
        this.symbol = symbol;
        this.date = date;
        this.timezone = timezone;
        this.baseAmountBought = baseAmountBought;
        this.priceBoughtAt = priceBoughtAt;
        this.quoteAmountSpent = quoteAmountSpent;
        this.active = active;
    }

    /**
     * Static constructor
     * @param {object} orderConfig The order response
     * @returns {BuyOrder} The BuyOrder instance
     */
    static fromBinanceResponse(orderConfig) {
        return new this(
            uuid(),
            orderConfig.info.clientOrderId,
            orderConfig.symbol,
            orderConfig.timestamp, // Binance's time in force is on GTC, which is 1 hour earlier than my local - Might be good to use dayjs to turn into my local time
            orderConfig.timeInForce, // Binance says GTC but I think it's the same as UTC
            orderConfig.amount,
            orderConfig.price,
            orderConfig.cost,
            true
        );
    }

    /**
     * Static constructor
     * @param {object} orderConfig The order response
     * @returns {BuyOrder} The BuyOrder instance
     */
    static fromDatabaseResponse(orderConfig) {
        return new this(
            orderConfig.order_id,
            orderConfig.exchange_order_id,
            orderConfig.symbol,
            orderConfig.date,
            orderConfig.timezone,
            orderConfig.base_amount_bought,
            orderConfig.price_bought_at,
            orderConfig.quote_amount_spent,
            orderConfig.active,
        );
    }
}

module.exports = BuyOrder;
