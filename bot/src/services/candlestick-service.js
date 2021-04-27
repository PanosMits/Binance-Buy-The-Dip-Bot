// const CandlestickRepository = require('../repositories/candlestick-repository');

/**
 * This class is used to retrieve OHLCV data
 */
class CandlestickService {
    // /**
    //  *  @param {CandlestickRepository}
    //  */
    // #candlestickRepository;

    // /**
    //  * @param {CandlestickRepository} candlestickRepository The candlestick repository
    //  */
    // constructor(candlestickRepository) {
    //     this.#candlestickRepository = candlestickRepository;
    // }

    // constructor(candlestickRepository) {
    //     this.#candlestickRepository = candlestickRepository;
    // }

    // /**
    //  * @returns {CandlestickCollection} A CandlestickCollection
    //  */
    // async getCandlestickForMarkets(marketCollection) {
    //     return this.#candlestickRepository.getCandlestickForMarkets(marketCollection));
    // }

    /**
     * Filters the USDT markets
     * @returns {array<Market>} An array of Market instances
     */
    // async getDollarMarkets() {
    //     const marketCollection = await this.#marketsRepository.getMarkets();
    //     return marketCollection.getDollarMarkets();
    // }
}

module.exports = new CandlestickService();
