/**
 * A model class for balance
 */
class Balance {
    #free;

    #used;

    #total;

    /**
     * @param {object} free The free balance -> Available to invest
     * @param {object} used The used balance -> not sure really when is considered used
     * @param {object} total The total balance -> free - used
     */
    constructor(free, used, total) {
        this.#free = free;
        this.#used = used;
        this.#total = total;
    }

    /**
     * Static constructor
     * @param {object} balanceConfig The balance details
     * @returns {Balance} The Balance instance
     */
    static fromResponse(balanceConfig) {
        return new this(
            balanceConfig.free,
            balanceConfig.used,
            balanceConfig.total,
        );
    }

    /**
     * Checks if there is available balance in the account
     * @param {number} amountThreshold The amount you need for which any balance above it 
     * is considered sufficient
     * @returns {boolean} True if it is, otherwise false
     */
    isSufficient(amountThreshold) {
        return this.#free.USDT >= amountThreshold;
    }
}

module.exports = Balance;
