/**
 * This error should be thrown when the limit of active orders for a symbol has been reached
 */
class ActiveOrderLimitError extends Error {
    /**
     * @param {string} message The error message
     */
    constructor(message) {
        super();
        this.name = 'ActiveOrderLimitError';
        this.message = message;
        this.code = 500;
    }

    /**
     * @param {number} symbol The symbol of the market for which the limit has been reached
     * @param {string} symbol The symbol of the market for which the limit has been reached
     * @return {ActiveOrderLimitError} The error
     */
    static fromLimitAndSymbol(limit, symbol) {
        return new this(`Active order limit of ${limit} has been reached for: ${symbol}`);
    }
}

module.exports = ActiveOrderLimitError;
