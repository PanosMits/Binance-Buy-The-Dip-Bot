const OrderRepository = require('../repositories/order-repository');
const BalanceRepository = require('../repositories/balance-repository');
const InsufficientBalanceError = require('../errors/insufficient-balance-error');
const ActiveOrderLimitError = require('../errors/active-order-limit-error');
const BoughtWithin24HoursError = require('../errors/bought-within-24-hours-error');

/**
 * This class is used to handle orders
 */
class OrderService {
    #defaultBuyAmount = 10;       // How much USDT to spend on each purchase
    #symbolActiveOrderLimit = 3;  // How many active orders a symbol can have

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
