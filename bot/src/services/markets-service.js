const MarketsRepository = require('../repositories/markets-repository');

/**
 * This class is used to retrieve information about markets
 */
class MarketsService {
    /**
     *  @param {MarketsRepository}
     */
    #marketsRepository;

    /**
     * @param {MarketsRepository} marketsRepository The markets repository
     */
    constructor(marketsRepository) {
        this.#marketsRepository = marketsRepository;
    }

    /**
     * Gets all the available markets in Binance
     * @returns {MarketCollection} A MarketCollection
     */
    async getMarkets() {
        return this.#marketsRepository.getMarkets();
    }

    /**
     * Filters the USDT markets
     * @returns {array<Market>} An array of Market instances
     */
    async getDollarMarkets() {
        const marketCollection = await this.#marketsRepository.getMarkets();
        return marketCollection.getDollarMarkets();
    }
}

module.exports = new MarketsService(MarketsRepository);
