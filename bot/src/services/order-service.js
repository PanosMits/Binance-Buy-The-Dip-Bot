const OrderRepository = require('../repositories/order-repository');
const CalculatorService = require('../services/calculator-service');

/**
 * This class is used to handle orders
 */
class OrderService {
    #defaultBuyAmount = 10;

    /**
     *  @param {OrderRepository}
     */
    #orderRepository;

    /**
     * @param {OrderRepository} orderRepository The order repository
     */
    constructor(orderRepository) {
        this.#orderRepository = orderRepository;
    }

    /**
     * Creates a market buy order
     * @returns 
     */
    async createMarketBuyOrder(symbol) {
        const cryptoAmount = await CalculatorService.calculateCryptoAmountForUSDT(symbol, this.#defaultBuyAmount);
        const order = this.#orderRepository.createMarketBuyOrder(symbol, cryptoAmount);
        // TODO: Check if there is sufficient balance for performing a purchase
        // TODO: Get all the records from buy_orders WHERE symbol = symbol AND active = True,
        //   if any those has been purchase within the last 24hours do NOT buy again
        // TODO: Save order to DB
        //   await this.#orderRepository.saveOrder(order);
        //   Note: If for some reason fails to save in DB, we need to cancel(limit order) or 
        //     immidiately sell(market) the order immidiately
        //     cause otherwise won't have a way to know when will be a good time to sell the amount bought
        //     cause there won't be anything to compare it with
        return order;
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

module.exports = new OrderService(OrderRepository);
