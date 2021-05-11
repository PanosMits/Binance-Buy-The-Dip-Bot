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
        // BUY
        const marketCollection = await this.#marketsService.getDollarMarketsExcludingSpecifiedMarkets();
        const tickerCollection = await this.#tickerService.getTickersForMarkets(marketCollection);
        const tickers = tickerCollection.getBiggestNegativePercentages();
        if (tickers) {
            await Promise.allSettled(tickers.map((ticker) => this.#orderService.createMarketBuyOrder(ticker.symbol)));
        }

        // SELL
        const buyOrderCollection = await this.#orderService.getActiveBuyOrders();
        if (!buyOrderCollection.isEmpty()) {
            await Promise.allSettled(buyOrderCollection.toArray().map((order) => this.#orderService.createMarketSellOrderForBuyOrder(order)));
        }

        console.log('Finised job...');
    }
}

module.exports = new Bot(MarketsService, CandlestickService, TickerService, OrderService);
