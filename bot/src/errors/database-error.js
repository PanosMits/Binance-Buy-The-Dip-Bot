/**
 * This error should be thrown when query to the database fails
 */
class DatabaseError extends Error {
    /**
     * @param {string} message The error message
     */
    constructor(message) {
        super();
        this.name = 'DatabaseError';
        this.message = message;
        this.code = 500;
    }

    /**
     * @param {object} error The error caught
     * @return {DatabaseError} The error
     */
    static fromError(error) {
        return new this(error.message);
    }
}

module.exports = DatabaseError;
