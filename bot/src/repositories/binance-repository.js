const axios = require('axios');

class BinanceRepository {
    /**
     *  @param {Axios}
     */
    #axios;

    /**
     * @param {Axios} axios The Axios client
     */
    constructor(axios) {
        this.#axios = axios;
    }

    getTickerPrice() {
        return 'Getting ticker price...';
    }
}

module.exports = new BinanceRepository(axios.create({
  baseURL: process.env.BINANCE_BASE_URL,
  timeout: 1000,
  headers: {'x-api-key': process.env.BINANCE_API_KEY}
}));
