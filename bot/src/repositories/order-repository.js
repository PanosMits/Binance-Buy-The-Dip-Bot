const BinanceClient = require('../model/binance-client');
const Order = require('../model/order/order');
const OrderType = require('../model/enums/order-type');
const OrderSide = require('../model/enums/order-side');

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
     * Creates a market buy order
     * @param {string} symbol The symbol of the market we want to buy 
     * @param {number} amount The amount we want to buy
     * @returns {Order} An order instance
     */
    async createMarketBuyOrder(symbol, amount) {
        const order = await this.#binanceClient.createMarketBuyOrder(symbol, amount);
        return Order.fromResponse(order);

        // TODO:
        //  Test function for buying based on the quote currency
        //  params = { 'quoteOrderQty': 20 };
        //  const order = await binance.createOrder(symbol, 'market', 'buy', null, null, params);

    }

    /**
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
