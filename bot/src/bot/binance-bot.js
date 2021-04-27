const MarketsService = require('../services/markets-service');
const CandlestickService = require('../services/candlestick-service');

class Bot {
    /**
     *  @param {MarketsService}
     */
    #marketsService;

    /**
     *  @param {CandlestickService}
     */
    #candlestickService;

    /**
     * @param {MarketsService} marketsService The markets service
     * @param {CandlestickService} candlestickService The candlestick service
     */
    constructor(marketsService, candlestickService) {
        this.#marketsService = marketsService;
        this.#candlestickService = candlestickService;
    }

    async run() {
        const dollarMarketsCollection = await this.#marketsService.getDollarMarkets();
        console.log(dollarMarketsCollection);

        const ohlcv = await this.#candlestickService.getCandlestickForMarkets(dollarMarketsCollection);
        console.log(ohlcv);
        
        // Get the candlestic data for each market
        // await this.#candleStickService.getMinute
        // const ohlc = await exchange.fetchOHLCV(dollarMarket.symbol, '1m', undefined, 1000); // Get last 1000 minutes ohlc
    }
}

module.exports = new Bot(MarketsService, CandlestickService);
