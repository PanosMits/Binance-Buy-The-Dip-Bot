const OrderBookRepository = require('../repositories/orderbook-repository');

/**
 * This class provides some helper function
 */
class CalculatorService {
    /**
     *  @param {OrderBookRepository}
     */
    #orderBookRepository;

    /**
     * @param {OrderBookRepository} orderBookRepository The order book repository
     */
    constructor(orderBookRepository) {
        this.#orderBookRepository = orderBookRepository;
    }

    /**
     * Calculates percentages differences between 2 numbers, close prices in this case.
     * The result can be either a negative or a positive number
     * @param {number} oldClose 
     * @param {number} newClose
     * @returns The percentage difference up to 2 decimal points
     */
    calculatePercentageDifference(oldClose, newClose) {
        let percent;
        if (newClose !== 0) {
            if (oldClose !== 0) {
                percent = (newClose - oldClose) / oldClose * 100;
            } else {
                percent = newClose * 100;
            }
        } else {
            percent = - oldClose * 100;
        }
        return percent.toFixed(2);
    }

    /**
     * Assume that we want to trade the DOGE/USDT market
     * and we want to spend X amount of USDT to buy DOGE.
     * There is no way to do that directly using CCXT.
     * Instead, the only thing you can do is to specify the amount
     * of the base currency(DOGE) you want to buy.
     * In other words, there is no way to tell it to spend 10 USDT to buy as much DOGE as possible.
     * The following function sort of solves that problem by getting the amount of the base currency
     * and calculating how much of the crypto equals to USDT amount passed in, then we can use that amount to the function
     * that eventually calls the Exchange API and executes the order.
     * 
     * Calculates the amount of the crypto needed to be bought that equals the usdtAmount passed in.
     * @param {string} symbol The symbol of the market
     * @param {number} usdtAmount The amount of USDT we want to spend
     * @returns {number} The amount of crypto needed to buy that ROUGHLY equals the usdtAmount
     */
    async calculateCryptoAmountForUSDT(symbol, usdtAmount) {
        let orderbook = await this.#orderBookRepository.getOrderBook(symbol);
        const askPrice = orderbook.asks.length ? orderbook.asks[0][0] : undefined; // The price I can buy a crypto at
        // const bidPrice = orderbook.bids.length ? orderbook.bids[0][0] : undefined; // The price I can sell my crypto at
        // const spread = (bidPrice && askPrice) ? askPrice - bidPrice : undefined; // The difference between bid and ask

        return ((100 * usdtAmount) / askPrice) / 100;
    }
}

module.exports = new CalculatorService(OrderBookRepository);
