// NOTE:
// This is a basic initial setup for the MYSql database the bot connects to.
// An ORM would be an overkill I believe.
// In order to execute the code in this file you first need to have a MySql server running somewhere
// Then you need to provide the env variables DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE
// Finally, just run the file or 'npm start -createdb'

require('dotenv').config({ path: '.env' });
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((error) => error ? console.log('Could not connect to db') : console.log('Connected to database ...'));

const createBuyOrdersTable = `
    CREATE TABLE IF NOT EXISTS buy_orders (
        order_id varchar(36) NOT NULL PRIMARY KEY,
        exchange_order_id varchar(255) NOT NULL, 
        symbol varchar(255) NOT NULL,
        date int(10) NOT NULL COMMENT 'The date the buy order was executed - as timestamp',
        base_amount_bought decimal(65, 30) NOT NULL COMMENT 'The amount of the base currency bought',
        price_bought_at decimal(65, 30) NOT NULL COMMENT 'The price of the crypto at the time of purchase',
        quote_amount_spent decimal(65, 30) NOT NULL COMMENT 'The amount of the quote currency spent in order to buy the base currency',
        active boolean COMMENT 'Wether this is an active order, meaning if has been sold or not yet'
    );
`;

const createSellOrdersTable = `
    CREATE TABLE IF NOT EXISTS sell_orders (
        order_id varchar(36) NOT NULL PRIMARY KEY,
        buy_order_id varchar(36) NOT NULL,
        exchange_order_id varchar(255) NOT NULL, 
        date int(10) NOT NULL COMMENT 'The date the sell order was executed - as timestamp',
        base_amount_sold decimal(65, 30) NOT NULL COMMENT 'The amount of the base currency sold',
        price_sold_at decimal(65, 30) NOT NULL COMMENT 'The quote price of the crypto at the time of sell',
        quote_amount_returned decimal(65, 30) NOT NULL COMMENT 'Technically, this is the profit made',
        FOREIGN KEY (buy_order_id) REFERENCES buy_orders(order_id)
    );
`;

db.query(createBuyOrdersTable, (err) => {
    if (err) throw err;
    console.log('buy_orders table created.');
});

db.query(createSellOrdersTable, (err) => {
    if (err) throw err;
    console.log('sell_orders table created.');
});

db.end();
