const BinanceClient = require('../model/binance-client');

class MarketsRepository {
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

    async getMarkets() {
        return this.#binanceClient.loadMarkets();
    }
}

module.exports = new MarketsRepository(BinanceClient.getInstance());
