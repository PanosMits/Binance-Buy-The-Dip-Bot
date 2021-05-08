const BinanceClient = require('../model/binance-client');
const Balance = require('../model/balance/balance');

/**
 * This class is used to get balance related data
 */
class BalanceRepository {
    /**
     *  @param {BinanceClient}
     */
    #binanceClient;

    /**
     * @param {BinanceClient} binanceClient The Binance client
     */
    constructor(binanceClient) {
        this.#binanceClient = binanceClient;
    }

    /**
     * Gets the account balance
     * @returns {Balance} A Balance instance
     */
    async getAccountBalance() {
        const balance = await this.#binanceClient.fetchBalance();
        return Balance.fromResponse(balance);
    }
}

module.exports = new BalanceRepository(BinanceClient.getInstance());
