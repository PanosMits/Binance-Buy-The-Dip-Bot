require('dotenv').config({ path: '.env' });
const mysql = require('mysql2');
const dayjs = require('dayjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((error) => error ? console.log('Could not connect to db') : console.log('Connected to database ...'));


// EXPECTED RESULTS for buy_orders seed:
//  1. Try to buy BTC -> Should not buy cause it already has 3 active orders 
//  2. Try to buy ETH -> Should not buy cause although it has only 2 active purchases the last purchase was made within 24 hours
//  3. Try to buy ADA -> Should procced to buying cause it has only 2 active orders
const seedBuyOrders = `
    INSERT INTO buy_orders (
        order_id,
        exchange_order_id,
        symbol,
        date,
        timezone,
        base_amount_bought,
        price_bought_at,
        quote_amount_spent,
        active
    )
    VALUES
        ('fa496854-0ed7-4cc5-b429-539cbe8cf70c', 'aba57496-13ff-4126-be5a-c8361d43a1a4', 'EOSDOWN/USDT', 1620393191, 'GTC', 4310.3448275862065, 0.00229, 10, true),
        ('1ecfc56d-13a4-4dcf-aed9-b1e9b5abd230', 'df02c9c3-f6b9-4347-836e-9518e3c77e13', 'BTC/USDT', ${dayjs().subtract(10, 'hour').unix()}, 'GTC', '0.00018052115', '55395.17', 10, true),
        ('f1978060-6561-43b0-98e3-6e09f4e432c6', '1ebe8f76-a87a-432c-a72d-e1d55943c558', 'BTC/USDT', ${dayjs().subtract(1, 'day').unix()}, 'GTC', '0.00019138668', '52250.24', 10, true),
        ('a23b6afc-8035-4496-8edb-8b6f6a471d4a', '7549bbb9-be9c-41f5-b5c5-d26cd8e99924', 'BTC/USDT', ${dayjs().subtract(2, 'day').unix()}, 'GTC', '0.0001995994', '50100.35', 10, true),
        ('487adc81-4506-4847-9203-8893247f3d02', '454c4a5e-7536-43b8-9da8-3608637a83f5', 'ETH/USDT', ${dayjs().subtract(11, 'hour').unix()}, 'GTC', '0.00352051934', '2840.49', 10, true),
        ('aec38f0e-fef0-4b0f-a6ae-9b34ae17cd94', '11d44d61-78fd-4d3f-90cc-03c5b1cf7d3c', 'ETH/USDT', ${dayjs().subtract(2, 'day').unix()}, 'GTC', '0.00311832483', '3206.85', 10, true),
        ('1230633e-f687-4fb0-a3dc-e1673b5d1947', 'acbdc179-2d71-4974-9dda-b6277d06ad97', 'ADA/USDT', ${dayjs().subtract(5, 'day').unix()}, 'GTC', '5.91715976331', '1.69', 10, true),
        ('a22c183b-4997-4cd4-8d96-15d635dd69e7', '14ff683b-9809-4469-a569-1ef9b4667a95', 'ADA/USDT', ${dayjs().subtract(10, 'day').unix()}, 'GTC', '8.84955752212', '1.13', 10, true),
        ('75b1c618-6600-413a-a5eb-56114706a01a', '34282fd5-4ea2-485d-9fa4-0dfc726fc5f8', 'ADA/USDT', ${dayjs().subtract(1, 'month').unix()}, 'GTC', '10.8695652174', '0.92', 10, false);
`;

db.query(seedBuyOrders, (err) => {
    if (err) throw err;
    console.log('buy_orders seeded.');
});

db.end();
