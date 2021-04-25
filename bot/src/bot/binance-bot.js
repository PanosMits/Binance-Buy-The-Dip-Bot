const MarketsService = require('../services/markets-service');

class Bot {
    /**
     *  @param {MarketsService}
     */
    #marketsService;

    /**
     * @param {MarketsService} marketsService The markets service
     */
    constructor(marketsService) {
        this.#marketsService = marketsService;
    }

    async run() {
        const dollarMarkets = await this.#marketsService.getDollarMarkets();
        console.log(dollarMarkets);
    }
}

module.exports = new Bot(MarketsService);
