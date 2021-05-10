const mysql = require('mysql2');
const BinanceClient = require('../model/binance-client');
const DatabaseClient = require('../model/database-client');
const BuyOrderCollection = require('../model/order/buy-order-collection');
const DatabaseError = require('../errors/database-error');

/**
 * This class is used to interact with anything order related.
 * This is from creating an order in Binance or getting the orders from the database.
 * NOTE: I am creating and closing a MySql connection in each class that needs to speak to the database.
 *   Initially, I was passing the database client as a dependency of the class but this had a few issues
 *   when I was trying to close the connection.
 */
class OrderRepository {
    /**
     *  @param {BinanceClient}
     */
    #binanceClient;

    /**
     * @param {BinanceClient} binanceClient The Binance client
     */
    constructor(binanceClient) {
        this.#binanceClient = binanceClient;
    }

    /**
     * Gets all the active orders for a symbol from the database
     * @param {string} symbol The symbol of the market you want to get the active buy orders
     * @returns {BuyOrderCollection} A BuyOrderCollection instance
     */
    async getActiveBuyOrdersForSymbol(symbol) {
        const connection = await DatabaseClient.createConnection();
        const query = 'SELECT * FROM buy_orders WHERE symbol = ? AND active = true';
        const results = await connection.promise()
            .query(query, [symbol])
            .then(([rows]) => rows)
            .catch((error) => {
                console.error(`Error occurred while getting active orders for ${symbol}`);
                throw DatabaseError.fromError(error);
            });

        connection.end();
        return BuyOrderCollection.fromDatabaseResponse(results);
    }

    /**
     * Saves a buy order in buy_orders table in database 
     * @param {BuyOrder} order The buy order to be saved
     */
    async saveBuyOrder(order) {
        const connection = await DatabaseClient.createConnection();
        const query = 'INSERT INTO buy_orders '
            + '(order_id, exchange_order_id, symbol, date, timezone, base_amount_bought, price_bought_at, quote_amount_spent, active) '
            + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const response = await connection.promise()
            .query(query, order.toDatabaseFormat())
            .then(([result]) => result)
            .catch((error) => {
                console.error(`Error occurred while saving buy order: ${order.toDatabaseFormat()}`);
                throw DatabaseError.fromError(error);
            });

        connection.end();
    }

    /**
     * Creates a market buy order
     * @param {string} symbol The symbol of the market we want to buy
     * @param {number} amount The quote currency amount we want to spend
     * @returns {Order} A BuyOrder instance
     */
    async createMarketBuyOrder(symbol, amount) {
        const params = { 'quoteOrderQty': amount };
        const order = await this.#binanceClient.createOrder(symbol, 'market', 'buy', null, null, params);
        return Order.fromResponse(order);
    }

    /**
     * TODO: Needs testing
     * Creates a market sell order
     * @param {string} symbol The symbol of the market we want to sell
     * @param {number} amount The amount we want to sell
     * @returns {Order} An order instance
     */
    async createMarketSellOrder(symbol, amount) {
        const order = await this.#binanceClient.createMarketSellOrder(symbol, amount);
        return Order.fromResponse(order);
    }
}

module.exports = new OrderRepository(BinanceClient.getInstance());
