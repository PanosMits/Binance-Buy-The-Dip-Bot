const dayjs = require('dayjs');
const BuyOrder = require('./buy-order');

/**
 * This class represents a collection of buy order instances
 */
class BuyOrderCollection {
    #buyOrders;

    /**
     * Constructor
     * @param {BuyOrder[]} buyOrders An amount of Market instances
     */
    constructor(buyOrders) {
        this.#buyOrders = buyOrders;
    }

    /**
     * Static constructor
     * @param {object[]} orders The buy orders returned from the database
     * @returns {BuyOrderCollection} A BuyOrderCollection instance
     */
    static fromDatabaseResponse(orders) {
        const buyOrdersCreated = orders.map((buyOrder) => BuyOrder.fromDatabaseResponse(buyOrder));
        return new this(buyOrdersCreated);
    }

    /**
     * Checks if the limit of active orders in the collection has been reached
     * @param {number} symbolActiveOrderLimit The limit
     * @returns {boolean} true on success, false otherwise
     */
    activeOrdersLimitReached(symbolActiveOrderLimit) {
        return this.#buyOrders.length >= symbolActiveOrderLimit;
    }

    /**
     * NOTE: Calculations take place in UTC time, not local time
     * Checks if a buy order has taken place within the last 24 hours
     * @returns {boolean} True on if it has, false otherwise
     */
    lastOrderBoughtWithin24Hours() {
        const now = dayjs();
        const millisecondsInDay = 1000 * 60 * 60 * 24;

        const results = this.#buyOrders.filter((order) => {
            const orderDate = dayjs.unix(order.date); // order.date is in unix timestamp, JS works in milliseconds
            const differenceFromNowInMilliseconds = now.diff(orderDate);
            return (differenceFromNowInMilliseconds < millisecondsInDay) ? true : false;
        });

        return (results.length < 1) ? false : true;
    }

    toArray() {
        return this.#buyOrders;
    }
}

module.exports = BuyOrderCollection;
