const BinanceRepository = require('../repositories/binance-repository');

class BinanceService {
    /**
     *  @param {BinanceRepository}
     */
    #binanceRepository;

    /**
     * @param {BinanceRepository} binanceRepository The binance repository
     */
    constructor(binanceRepository) {
        this.#binanceRepository = binanceRepository;
    }

    getTickerPrice() {
        return this.#binanceRepository.getTickerPrice();
    }
}

module.exports = new BinanceService(BinanceRepository);
