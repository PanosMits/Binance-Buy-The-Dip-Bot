const mysql = require('mysql2');
const BinanceClient = require('../model/binance-client');
const DatabaseClient = require('../model/database-client');
const BuyOrder = require('../model/order/buy-order');
const SellOrder = require('../model/order/sell-order');
const BuyOrderCollection = require('../model/order/buy-order-collection');
const DatabaseError = require('../errors/database-error');
const BinanceError = require('../errors/binance-error');

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
     * Gets all the active orders from the database
     * @returns {BuyOrderCollection} A BuyOrderCollection instance
     */
    async getActiveBuyOrders() {
        const connection = await DatabaseClient.createConnection();
        const query = 'SELECT * FROM buy_orders WHERE active = true';
        const results = await connection.promise()
            .query(query)
            .then(([rows]) => rows)
            .catch((error) => {
                console.error(`Error occurred while getting active orders`);
                throw DatabaseError.fromError(error);
            });

        connection.end();
        return BuyOrderCollection.fromDatabaseResponse(results);
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
     * Creates a market buy order
     * @param {string} symbol The symbol of the market we want to buy
     * @param {number} amount The quote currency amount we want to spend
     * @returns {BuyOrder} A BuyOrder instance
     */
    async createMarketBuyOrder(symbol, amount) {
        try {
            const params = { 'quoteOrderQty': amount };
            const order = await this.#binanceClient.createOrder(symbol, 'market', 'buy', null, null, params);
            return BuyOrder.fromBinanceResponse(order);
        } catch (error) {
            console.error(`Error occurred while creating a market buy order`);
            throw BinanceError.fromMessage(error.message);
        }
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
     * Creates a market sell order
     * @param {string} symbol The symbol of the market we want to sell
     * @param {number} amount The amount of the base currency we want to sell
     * @returns {SellOrder} An SellOrder instance
     */
    async createMarketSellOrderForBuyOrder(buyOrder) {
        try {
            console.log(`Selling ${buyOrder.baseAmountBought} of ${buyOrder.symbol}`);
            const sellOrder = await this.#binanceClient.createMarketSellOrder(buyOrder.symbol, buyOrder.baseAmountBought);
            console.log(`Successfully sold ${buyOrder.baseAmountBought} of ${buyOrder.symbol}`);
            return SellOrder.fromBinanceResponseAndBuyOrder(sellOrder, buyOrder);
        } catch (error) {
            console.error(`Error occurred while creating a market sell order`);
            throw BinanceError.fromMessage(error.message);
        }
    }

    /**
     * Saves a sell order in sell_orders table in database 
     * @param {SellOrder} order The sell order to be saved
     */
    async saveSellOrder(order) {
        const connection = await DatabaseClient.createConnection();
        console.log('Saving sell order');
        const insertQuery = 'INSERT INTO sell_orders '
            + '(order_id, buy_order_id, exchange_order_id, date, timezone, base_amount_sold, price_sold_at, quote_amount_returned) '
            + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        await connection.promise()
            .query(insertQuery, order.toDatabaseFormat())
            .then(() => console.log(`Sell order with ID ${order.orderId} saved successfully`))
            .catch((error) => {
                console.error(`Error occurred while saving sell order: ${order.toDatabaseFormat()}`);
                throw DatabaseError.fromError(error);
            });

        console.log(`Updating buy order with ID: ${order.buyOrderId}`);
        const updateQuery = 'UPDATE buy_orders SET active = false WHERE order_id = ?';
        await connection.promise()
            .query(updateQuery, [order.buyOrderId])
            .then(() => console.log(`Buy order with ID: ${order.buyOrderId} updated successfully`))
            .catch((error) => {
                console.error(`Error occurred while updating buy order with ID: ${order.buyOrderId}`);
                throw DatabaseError.fromError(error);
            });

        connection.end();
    }
}

module.exports = new OrderRepository(BinanceClient.getInstance());
