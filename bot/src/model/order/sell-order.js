const uuid = require('uuid');

/**
 * This class represents an sell order
 */
class SellOrder {
    orderId

    buyOrderId

    exchangeOrderId

    date

    timezone

    baseAmountSold

    priceSoldAt

    quoteAmountReturned

    /**
     * @param {number} orderId The order ID
     * @param {number} buyOrderId The buy order ID this sell order is associated to
     * @param {number} exchangeOrderId The order ID given by the exchange
     * @param {number} date The date the order took place - in timestamp
     * @param {string} timezone The zone the date is on
     * @param {number} baseAmountSold The amount of the base currency sold
     * @param {number} priceSoldAt The price the base currency was sold at
     * @param {number} quoteAmountReturned The amount of the base currency was sold for (excluding fees)
     */
    constructor(
        orderId,
        buyOrderId,
        exchangeOrderId,
        date,
        timezone,
        baseAmountSold,
        priceSoldAt,
        quoteAmountReturned
    ) {
        this.orderId = orderId;
        this.buyOrderId = buyOrderId;
        this.exchangeOrderId = exchangeOrderId;
        this.date = date;
        this.timezone = timezone;
        this.baseAmountSold = baseAmountSold;
        this.priceSoldAt = priceSoldAt;
        this.quoteAmountReturned = quoteAmountReturned;
    }

    /**
     * Static constructor
     * @param {object} sellOrderConfig The sell order response from Exchange
     * @param {BuyOrder} buyOrder The buy order associated to the sell order
     * @returns {SellOrder} The SellOrder instance
     */
    static fromBinanceResponseAndBuyOrder(sellOrderConfig, buyOrder) {
        return new this(
            uuid.v4(),
            buyOrder.orderId,
            sellOrderConfig.info.clientOrderId,
            sellOrderConfig.timestamp,
            sellOrderConfig.timeInForce,
            sellOrderConfig.amount,
            sellOrderConfig.price,
            sellOrderConfig.cost - sellOrderConfig.fee.cost
        );
    }

    /**
     * Static constructor
     * @param {object} orderConfig The order response
     * @returns {SellOrder} The SellOrder instance
     */
    static fromDatabaseResponse(orderConfig) {
        return new this(
            orderConfig.order_id,
            orderConfig.buy_order_id,
            orderConfig.exchange_order_id,
            orderConfig.date,
            orderConfig.timezone,
            orderConfig.base_amount_sold,
            orderConfig.price_sold_at,
            orderConfig.quote_amount_returned,
        );
    }

    /**
     * Converts the object to database compatible format
     * @returns {array} The object to database format
     */
    toDatabaseFormat() {
        return [
            this.orderId,
            this.buyOrderId,
            this.exchangeOrderId,
            this.date,
            this.timezone,
            this.baseAmountSold,
            this.priceSoldAt,
            this.quoteAmountReturned
        ];
    }
}

module.exports = SellOrder;
