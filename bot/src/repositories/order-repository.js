const mysql = require('mysql2');
const BinanceClient = require('../model/binance-client');
const DatabaseClient = require('../model/database-client');
const Order = require('../model/order/order');
const OrderType = require('../model/enums/order-type');
const OrderSide = require('../model/enums/order-side');
const DatabaseError = require('../errors/database-error');

class OrderRepository {
    /**
     *  @param {BinanceClient}
     */
    #binanceClient;

    /**
     *  @param {DatabaseClient}
     */
    #databaseClient;

    /**
     * @param {BinanceClient} binanceClient The Binance client
     * @param {DatabaseClient} databaseClient The Database client
     */
    constructor(binanceClient, databaseClient) {
        this.#binanceClient = binanceClient;
        this.#databaseClient = databaseClient;
    }

    /**
     * Gets all the active orders for a symbol from the database
     * @param {string} symbol The symbol of the market you want to get the active buy orders
     * @returns {Order} A BuyOrder instance
     */
    async getActiveBuyOrdersForSymbol(symbol) {
        const query = 'SELECT * FROM buy_orders WHERE symbol = ? AND active = true';
        const results = await this.#databaseClient.promise()
            .query(query, [symbol])
            .then(([rows]) => rows)
            .catch((error) => {
                console.error(`Error occurred while getting active orders for ${symbol}`);
                throw DatabaseError.fromError(error);
            });

        this.#databaseClient.end();

        // TODO: Return a BuyOrderCollection
        // return BuyOrder.fromDatabaseResponse(results);
        return results;
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

module.exports = new OrderRepository(BinanceClient.getInstance(), mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}));
