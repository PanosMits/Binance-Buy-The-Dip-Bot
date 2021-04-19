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
     * @param {object} markets
     * @returns {array<object>} An array of objects containing the filtered markets
     */
    async getDollarMarkets() {
        const marketCollection = await this.#marketsRepository.getMarkets();
        return marketCollection.getDollarMarkets();
    }
}

module.exports = new MarketsService(MarketsRepository);
