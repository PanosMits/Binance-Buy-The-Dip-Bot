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
     * @param {object} markets
     * @returns {array<object>} An array of objects containing the markets
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
        const markets = await this.#marketsRepository.getMarkets();
        const dollarMarkets = [];
        for (const market in markets) {
            if (markets[market].quoteId === 'USDT' && markets[market].spot === true) {
                dollarMarkets.push(markets[market]);
            }
        }
        return dollarMarkets;
    }
}

module.exports = new MarketsService(MarketsRepository);
