const TickerRepository = require('../repositories/ticker-repository');

/**
 * This class is used to retrieve ticker data
 */
class TickerService {
    /**
     *  @param {TickerRepository}
     */
    #tickerRepository;

    /**
     * @param {TickerRepository} tickerRepository The ticker repository
     */
    constructor(tickerRepository) {
        this.#tickerRepository = tickerRepository;
    }

    /**
     * Gets ticker data for a market
     * @param {string} ticker The market symbol we want the ticker data for
     * @returns {} The ticker data
     */
    async getTicker(ticker) {
        return this.#tickerRepository.getTicker(ticker);
    }

    /**
     * Gets ticker data for a set of markets
     * @param {MarketCollection} marketCollection The markets want the ticker data for
     * @returns {object} The ticker data
     */
    async getTickers(marketCollection) {
        return this.#tickerRepository.getTickers(marketCollection.getMarketSymbols());
    }
}

module.exports = new TickerService(TickerRepository);
