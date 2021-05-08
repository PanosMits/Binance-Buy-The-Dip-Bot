/**
 * Error that gets thrown when the account balance is not enough to perform a purchase
 */
class InsufficientBalanceError extends Error {
    /**
    * The constructor
    */
    constructor() {
        super();
        this.name = 'InsufficientBalanceError';
        this.message = 'Not enough balance on your account.';
        this.statusCode = 400;
    }
}

module.exports = new InsufficientBalanceError();
