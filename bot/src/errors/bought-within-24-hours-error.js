/**
 * This error should be thrown when a symbol has already been purchased within the last 24 hours
 */
class BoughtWithin24HoursError extends Error {
    /**
     * @param {string} message The error message
     */
    constructor(message) {
        super();
        this.name = 'BoughtWithin24HoursError';
        this.message = message;
        this.code = 500;
    }

    /**
     * @param {string} symbol The symbol of the market for which a purchase has been made the last 24 hours
     * @return {BoughtWithin24HoursError} The error
     */
    static fromSymbol(symbol) {
        return new this(`A buy order for ${symbol} has already been executed within the last 24 hours`);
    }
}

module.exports = BoughtWithin24HoursError;
