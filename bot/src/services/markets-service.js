const MarketsRepository = require('../repositories/markets-repository');
const MarketCollection = require('../model/market/market-collection');

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
     * @returns {MarketCollection} A MarketCollection
     */
    async getDollarMarkets() {
        const marketCollection = await this.#marketsRepository.getMarkets();
        return marketCollection.getDollarMarkets();
    }

    /**
     * Excludes the ETF markets
     * @returns {MarketCollection} An array of Market instances
     */
    async getDollarMarketsExcludingETFs() {
        const etfMarketsList = [
            '1INCHUP/USDT', '1INCHDOWN/USDT',
            'XLMUP/USDT', 'XLMDOWN/USDT',
            'SUSHIUP/USDT', 'SUSHIDOWN/USDT',
            'AAVEUP/USDT', 'AAVEDOWN/USDT',
            'BCHUP/USDT', 'BCHDOWN/USDT',
            'YFIUP/USDT', 'YFIDOWN/USDT',
            'FILUP/USDT', 'FILDOWN/USDT',
            'SXPUP/USDT', 'SXPDOWN/USDT',
            'UNIUP/USDT', 'UNIDOWN/USDT',
            'LTCUP/USDT', 'LTCDOWN/USDT',
            'XRPUP/USDT', 'XRPDOWN/USDT',
            'DOTUP/USDT', 'DOTDOWN/USDT',
            'TRXUP/USDT', 'TRXDOWN/USDT',
            'EOSUP/USDT', 'EOSDOWN/USDT',
            'XTZUP/USDT', 'XTZDOWN/USDT',
            'BNBUP/USDT', 'BNBDOWN/USDT',
            'LINKUP/USDT', 'LINKDOWN/USDT',
            'ADAUP/USDT', 'ADADOWN/USDT',
            'ETHUP/USDT', 'ETHDOWN/USDT',
            'BTCUP/USDT', 'BTCDOWN/USDT'
        ];

        const markets = await this.getDollarMarkets();
        const marketsExcludingETFs = markets
            .toArray()
            .filter((market) => !etfMarketsList.includes(market.symbol));

        return MarketCollection.fromArray(marketsExcludingETFs);
    }

    /**
     * Excludes the specified markets
     * @returns {MarketCollection} An array of Market instances
     */
    async getDollarMarketsExcludingSpecifiedMarkets() {
        const excludedMarketsList = [
            '1INCHUP/USDT', '1INCHDOWN/USDT', 'XLMUP/USDT', 'XLMDOWN/USDT', 'SUSHIUP/USDT', 'SUSHIDOWN/USDT',
            'AAVEUP/USDT', 'AAVEDOWN/USDT', 'BCHUP/USDT', 'BCHDOWN/USDT', 'YFIUP/USDT', 'YFIDOWN/USDT',
            'FILUP/USDT', 'FILDOWN/USDT', 'SXPUP/USDT', 'SXPDOWN/USDT', 'UNIUP/USDT', 'UNIDOWN/USDT',
            'LTCUP/USDT', 'LTCDOWN/USDT', 'XRPUP/USDT', 'XRPDOWN/USDT', 'DOTUP/USDT', 'DOTDOWN/USDT',
            'TRXUP/USDT', 'TRXDOWN/USDT', 'EOSUP/USDT', 'EOSDOWN/USDT', 'XTZUP/USDT', 'XTZDOWN/USDT',
            'BNBUP/USDT', 'BNBDOWN/USDT', 'LINKUP/USDT', 'LINKDOWN/USDT', 'ADAUP/USDT', 'ADADOWN/USDT',
            'ETHUP/USDT', 'ETHDOWN/USDT', 'BTCUP/USDT', 'BTCDOWN/USDT', 'DOGE/USDT'
        ];
        const markets = await this.getDollarMarkets();
        const marketsExcludingSpecifiedMarkets = markets
            .toArray()
            .filter((market) => !excludedMarketsList.includes(market.symbol));

        return MarketCollection.fromArray(marketsExcludingSpecifiedMarkets);
    }
}

module.exports = new MarketsService(MarketsRepository);
