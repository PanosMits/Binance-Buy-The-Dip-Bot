const mysql = require('mysql2');

/**
 * A singleton class for a Database Client
 */
class DatabaseClient {
    createConnection() {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
    }
}

module.exports = new DatabaseClient;
