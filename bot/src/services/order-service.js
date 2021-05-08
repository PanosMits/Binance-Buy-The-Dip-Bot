const OrderRepository = require('../repositories/order-repository');
const BalanceRepository = require('../repositories/balance-repository');
const CalculatorService = require('../services/calculator-service');
const InsufficientBalanceError = require('../errors/insufficient-balance-error');

/**
 * This class is used to handle orders
 */
class OrderService {
    #defaultBuyAmount = 100;

    /**
     *  @param {OrderRepository}
     */
    #orderRepository;

    /**
     *  @param {BalanceRepository}
     */
    #balanceRepository;

    /**
     * @param {OrderRepository} orderRepository The order repository
     * @param {BalanceRepository} balanceRepository The balance repository
     */
    constructor(orderRepository, balanceRepository) {
        this.#orderRepository = orderRepository;
        this.#balanceRepository = balanceRepository;
    }

    /**
     * Creates a market buy order
     * @param {string} symbol The symbol of the market on which you need to execute a buy order
     * @returns {Order} An Order instance
     */
    async createMarketBuyOrder(symbol) {
        try {
            // TODO: Check if there is sufficient balance for performing a purchase
            const balance = await this.#balanceRepository.getAccountBalance();
            if (!balance.isSufficient(this.#defaultBuyAmount)) throw InsufficientBalanceError;

            // TODO: 
            //   - get all the records from buy_orders WHERE symbol = symbol AND active = True,
            //     -> const buyOrderCollection = this.#orderRepository.getActiveBuyOrdersForSymbol(symbol);
            //   - if symbol has more than 3 active buy orders do NOT buy again 
            //     -> if (buyOrderCollection().ordersMaxedOut()) throw OrdersMaxedOutError;
            //   - if any of those has been purchased within the last 24hours do NOT buy again
            //     -> if (buyOrderCollection().orderBoughtWithin24Hours()) throw BoughtWithin24HoursError;

            // const cryptoAmount = await CalculatorService.calculateCryptoAmountForUSDT(symbol, this.#defaultBuyAmount);
            // const order = this.#orderRepository.createMarketBuyOrder(symbol, cryptoAmount);

            // TODO: Save order to DB
            //   await this.#orderRepository.saveBuyOrder(order);
            //   Note: If for some reason fails to save in DB, we need to cancel(limit order) or 
            //     immidiately sell(market) the order immidiately
            //     cause otherwise won't have a way to know when will be a good time to sell the amount bought
            //     cause there won't be anything to compare it with

            return order;
        } catch (error) {
            // TODO: In case of error might need to cancel the order here ?
            console.error(`An error occurred while creating an order for ${symbol}: ${error.message}`);
            throw error;
        }
    }

    /**
     * Creates a market sell order
     * @returns 
     */
    async createMarketSellOrder(symbol) {
        // TODO: 
        // Get the balance of the symbol, save it as amount and pass it down to
        // createMarketSellOrder(symbol, amount). This will then be used as the amount to be sold

        // TODO:
        // Get all the active buy orders from database
        // Compare the current price of the symbol for each of the active orders with the price_bought_at,
        //  if the current price of the symbol is 10% or higher than price_bought_at then procced on selling that order.
        //  After selling, set active to false in buy_orders table and create a new record in sell_orders
        return this.#orderRepository.createMarketSellOrder(symbol);
    }
}

module.exports = new OrderService(OrderRepository, BalanceRepository);
