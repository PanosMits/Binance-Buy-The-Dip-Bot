const uuid = require('uuid');

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
     * @param {string} orderId The order ID
     * @param {string} exchangeOrderId The order ID given by the exchange
     * @param {string} symbol The symbol of the order
     * @param {number} date The date the order took place - in timestamp
     * @param {string} timezone The zone the date is on
     * @param {number} baseAmountBought The amount of the base currency bought
     * @param {number} priceBoughtAt The price the base currency was bought at
     * @param {number} quoteAmountSpent The amount of quote currency spent on the transaction
     * @param {boolean} active Wether the order is active or not - meaning wether it has already been sold or not. True if active
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
            uuid.v4(),
            orderConfig.info.clientOrderId,
            orderConfig.symbol,
            orderConfig.timestamp, // Binance's time in force is on GTC, which is 1 hour earlier than my local - Might be good to use dayjs to turn into my local time
            orderConfig.timeInForce, // Binance says GTC but I think it's the same as UTC
            orderConfig.amount - orderConfig.fee.cost, // Exclude the fee
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

    /**
     * Converts the object to database compatible format
     * @returns {array} The object to database format
     */
    toDatabaseFormat() {
        return [
            this.orderId,
            this.exchangeOrderId,
            this.symbol,
            this.date,
            this.timezone,
            this.baseAmountBought,
            this.priceBoughtAt,
            this.quoteAmountSpent,
            this.active
        ];
    }
}

module.exports = BuyOrder;
