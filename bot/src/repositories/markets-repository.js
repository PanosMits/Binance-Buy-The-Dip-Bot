const BinanceClient = require('../model/binance-client');
const MarketCollection = require('../model/market/market-collection');

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

    /**
     * Gets all the available markets in Binance
     * @returns {MarketCollection} A MarketCollection
     */
    async getMarkets() {
        const markets = await this.#binanceClient.loadMarkets();
        return MarketCollection.fromResponse(markets);
    }
}

module.exports = new MarketsRepository(BinanceClient.getInstance());
