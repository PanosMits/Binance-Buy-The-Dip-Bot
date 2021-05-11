const uuid = require('uuid');
const OrderRepository = require('../repositories/order-repository');
const BalanceRepository = require('../repositories/balance-repository');
const TickerRepository = require('../repositories/ticker-repository');
const CalculatorService = require('../services/calculator-service');
const InsufficientBalanceError = require('../errors/insufficient-balance-error');
const ActiveOrderLimitError = require('../errors/active-order-limit-error');
const BoughtWithin24HoursError = require('../errors/bought-within-24-hours-error');

/**
 * This class is used to handle orders
 */
class OrderService {
    #defaultBuyAmount = 10;         // How much USDT to spend on each purchase TODO: +0.01% for fees
    #symbolActiveOrderLimit = 3;    // How many active orders a symbol can have
    #sellPercentageThreshold = 10;  // The percentage increase we are happy with for selling an active order

    /**
     *  @param {OrderRepository}
     */
    #orderRepository;

    /**
     *  @param {BalanceRepository}
     */
    #balanceRepository;

    /**
     *  @param {TickerRepository}
     */
    #tickerRepository;

    /**
     * @param {OrderRepository} orderRepository The order repository
     * @param {BalanceRepository} balanceRepository The balance repository
     * @param {TickerRepository} tickerRepository The ticker repository
     */
    constructor(orderRepository, balanceRepository, tickerRepository) {
        this.#orderRepository = orderRepository;
        this.#balanceRepository = balanceRepository;
        this.#tickerRepository = tickerRepository;
    }

    /**
     * Gets all the active buy orders from the database
     * @returns {BuyOrderCollection} A BuyOrderCollection instance
     */
    async getActiveBuyOrders() {
        return this.#orderRepository.getActiveBuyOrders();
    }

    /**
     * Creates a market buy order
     * @param {string} symbol The symbol of the market on which you need to execute a buy order
     * @returns {Order} An Order instance
     */
    async createMarketBuyOrder(symbol) {
        try {
            const balance = await this.#balanceRepository.getAccountBalance();
            if (!balance.isSufficient(this.#defaultBuyAmount)) throw InsufficientBalanceError;

            const buyOrderCollection = await this.#orderRepository.getActiveBuyOrdersForSymbol(symbol);

            if (buyOrderCollection.activeOrdersLimitReached(this.#symbolActiveOrderLimit))
                throw ActiveOrderLimitError.fromLimitAndSymbol(this.#symbolActiveOrderLimit, symbol);
            if (buyOrderCollection.lastOrderBoughtWithin24Hours()) throw BoughtWithin24HoursError.fromSymbol(symbol);

            const order = await this.#orderRepository.createMarketBuyOrder(symbol, this.#defaultBuyAmount);
            await this.#orderRepository.saveBuyOrder(order);

            return order;
        } catch (error) {
            console.error(`An error occurred while creating a buy order for ${symbol}: ${error.message}`);
            throw error;
        }
    }

    /**
     * Cheks if there are any buy orders that have made enough profit and sells them if it's worth it
     * @param {BuyOrder} order The buy order we want to check if it's worth selling
     */
    async createMarketSellOrderForBuyOrder(buyOrder) {
        try {
            const ticker = await this.#tickerRepository.getTicker(buyOrder.symbol);

            if (CalculatorService.calculatePercentageDifference(buyOrder.priceBoughtAt, ticker.bidPrice) >= this.#sellPercentageThreshold) {
                console.log(`${buyOrder.symbol}: `);
                console.log(`Buy order ID: ${buyOrder.orderId}`);
                console.log(`Bought at: ${buyOrder.priceBoughtAt}`);
                console.log(`Can sell at: ${ticker.bidPrice}`);
                console.log(`Difference: ${CalculatorService.calculatePercentageDifference(buyOrder.priceBoughtAt, ticker.bidPrice)}%`);
                console.log(`Amount for sale: ${buyOrder.baseAmountBought}`);
                console.log('==========================================================================================');

                const sellOrder = await this.#orderRepository.createMarketSellOrderForBuyOrder(buyOrder);
                await this.#orderRepository.saveSellOrder(sellOrder);
                return sellOrder;
            }

            return undefined;
        } catch (error) {
            console.error(`An error occurred while creating a sell order for ${symbol}: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new OrderService(OrderRepository, BalanceRepository, TickerRepository, CalculatorService);
