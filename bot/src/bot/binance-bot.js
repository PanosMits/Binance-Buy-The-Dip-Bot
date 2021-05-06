const MarketsService = require('../services/markets-service');
const CandlestickService = require('../services/candlestick-service');
const TickerService = require('../services/ticker-service');
const OrderService = require('../services/order-service');

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
     *  @param {TickerService}
     */
    #tickerService;

    /**
     *  @param {OrderService}
     */
    #orderService;

    /**
     * @param {MarketsService} marketsService The markets service
     * @param {CandlestickService} candlestickService The candlestick service
     * @param {TickerkService} tickerService The ticker service
     * @param {OrderService} orderService The order service
     */
    constructor(marketsService, candlestickService, tickerService, orderService) {
        this.#marketsService = marketsService;
        this.#candlestickService = candlestickService;
        this.#tickerService = tickerService;
        this.#orderService = orderService;
    }

    async run() {
        // WORKING
        // const dollarMarketsCollection = await this.#marketsService.getDollarMarkets();
        // const marketCandlestickResults = await this.#candlestickService.get5mCandlesticks(dollarMarketsCollection);
        // marketCandlestickResults.map((marketCandlestickResult) => {
        //     console.log(`24 hour difference for: ${marketCandlestickResult.toObject().symbol} is: ${marketCandlestickResult.getMarket24HourDifference()}%`);
        // });


        // TEST getTicker
        // const dollarMarketsCollection = await this.#marketsService.getDollarMarkets();
        // Promise.all(dollarMarketsCollection.toArray().map(async (market) => {
        //     const result = await this.#tickerService.getTicker(market.symbol);
        //     console.log(`24 hour difference for: ${market.symbol} is: ${result.percentage}%`);
        // }));


        // TEST getTickers - Fastest way of getting the 24 hour change
        // const marketCollection = await this.#marketsService.getDollarMarketsExcludingETFs();
        // const tickerCollection = await this.#tickerService.getTickersForMarkets(marketCollection);
        // console.log(tickerCollection.getBiggestNegativePercentages());


        // TEST create order
        console.time('Time');
        const marketCollection = await this.#marketsService.getDollarMarkets();
        const tickerCollection = await this.#tickerService.getTickersForMarkets(marketCollection);
        const tickers = tickerCollection.getBiggestNegativePercentages();

        if (tickers) {
            Promise.all(tickers.map((ticker) => this.#orderService.createMarketBuyOrder(ticker.symbol)))
                .then(() => console.timeEnd('Time'));
        }

        console.log(tickers);
    }
}

module.exports = new Bot(MarketsService, CandlestickService, TickerService, OrderService);
