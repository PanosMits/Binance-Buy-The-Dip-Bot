const mysql = require('mysql2');

/**
 * A singleton class for a Database Client
 */
class DatabaseClient {
    constructor() {
        if (!DatabaseClient.instance) {
            DatabaseClient.instance = mysql.createPool({
                connectionLimit: 10,
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
        }
    }

    getInstance() {
        return DatabaseClient.instance;
    }
}

module.exports = new DatabaseClient;
