const BinanceClient = require('../model/binance-client');

class OrderBookRepository {
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
     * Gets the order book for a symbol
     * @param {string} symbol The symbol of the market we want to get the order book for - e.g. BTC/USDT 
     * @returns 
     */
    async getOrderBook(symbol) {
        return this.#binanceClient.fetchOrderBook(symbol);
    }
}

module.exports = new OrderBookRepository(BinanceClient.getInstance());
