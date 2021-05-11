/**
 * This error should be thrown when a call to the Binance API fails
 */
class BinanceError extends Error {
    /**
     * @param {string} message The error message
     */
    constructor(message) {
        super();
        this.name = 'BinanceError';
        this.message = message;
        this.code = 500;
    }

    /**
     * @param {string} message The error message
     * @return {BinanceError} The error
     */
    static fromError(message) {
        return new this(message);
    }
}

module.exports = BinanceError;
