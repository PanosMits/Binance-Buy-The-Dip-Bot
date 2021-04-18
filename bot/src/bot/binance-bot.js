const BinanceService = require('../services/binance-service');
const MarketsService = require('../services/markets-service');

class Bot {
    /**
     *  @param {BinanceService}
     */
    #binanceService;

    /**
     *  @param {MarketsService}
     */
    #marketsService;

    /**
     * @param {BinanceService} binanceService The binance service
     * @param {MarketsService} marketsService The markets service
     */
    constructor(binanceService, marketsService) {
        this.#binanceService = binanceService;
        this.#marketsService = marketsService;
    }

    async run() {
        // const result = this.#binanceService.getTickerPrice();
        const result = await this.#marketsService.getDollarMarkets();
        console.log(result);
    }
}

module.exports = new Bot(BinanceService, MarketsService);
