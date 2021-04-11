const BinanceService = require('../services/binance-service');

class Bot {
    /**
     *  @param {BinanceService}
     */
    #binanceService;

    /**
     * @param {BinanceService} binanceService The binance service
     */
    constructor(binanceService) {
        this.#binanceService = binanceService;
    }

    run() {
        const result = this.#binanceService.getTickerPrice();
        console.log(result);
    }
}

module.exports = new Bot(BinanceService);
