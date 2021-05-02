const CandlestickRepository = require('../repositories/candlestick-repository');
const CandlestickCollection = require('../model/candlestick/candlestick-collection');
const MarketCandlestickResult = require('../model/market/market-candlestick-result');
const Timeframe = require('../model/enums/timeframe');

/**
 * This class is used to retrieve OHLCV data
 */
class CandlestickService {
    /**
     *  @param {CandlestickRepository}
     */
    #candlestickRepository;

    /**
     * @param {CandlestickRepository} candlestickRepository The candlestick repository
     */
    constructor(candlestickRepository) {
        this.#candlestickRepository = candlestickRepository;
    }

    /**
     * Gets the 5m ohlcv for the markets provided - Average time 2 minutes and 21 seconds
     * @param {MarketCollection} marketCollection The markets you need the 5 minute ohlcv prices for
     * @returns {MarketCandlestickResult} A MarketCandlestickResult instance
     */
    async get5mCandlesticks(marketCollection) {
        return Promise.all(marketCollection.toArray().map(async (market) => {
            const candlestickCollection = await this.#candlestickRepository.getCandlesticksForMarket(
                market.symbol,
                Timeframe.FIVE_MINUTES,
            );

            return new MarketCandlestickResult(market.symbol, candlestickCollection);
        }));
    }

    // /**
    //  * Gets the 1h ohlcv for the markets provided
    //  * @param {MarketCollection} marketCollection The markets you need the 1 hour ohlcv prices for
    //  * @returns {CandlestickCollection} A CandlestickCollection
    //  */
    // async get1hCandlesticks(marketCollection) {
    //     return Promise.all(marketCollection.toArray().map((market) => {
    //         return this.#candlestickRepository.getCandlesticksForMarket(
    //             market.symbol,
    //             Timeframe.ONE_HOUR,
    //         );
    //     }));
    // }

    // /**
    //  * Gets the 1d ohlcv for the markets provided
    //  * @param {MarketCollection} marketCollection The markets you need the 1 day ohlcv prices for
    //  * @returns {CandlestickCollection} A CandlestickCollection
    //  */
    // async get1dCandlesticks(marketCollection) {
    //     return Promise.all(marketCollection.toArray().map((market) => {
    //         return this.#candlestickRepository.getCandlesticksForMarket(
    //             market.symbol,
    //             Timeframe.ONE_DAY,
    //         );
    //     }));
    // }
}

module.exports = new CandlestickService(CandlestickRepository);
