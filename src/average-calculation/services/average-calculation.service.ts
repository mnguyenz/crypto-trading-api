import { Injectable } from '@nestjs/common';
import { GetAverageResponse } from '~average-calculation/responses/get-average.response';
import { BinanceApiMarketService } from '~binance-api/services/binance-api-market.service';
import { BinanceApiTradeService } from '~binance-api/services/binance-api-trade.service';
import { BinanceTrade } from '~binance-api/types/binance-trade.type';
import { CRYPTO_CODE } from '~core/constants/crypto-code.constant';

@Injectable()
export class AverageCalculationService {
    constructor(
        private binanceApiTradeService: BinanceApiTradeService,
        private binanceApiMarketService: BinanceApiMarketService
    ) {}

    async getAverage(symbol?: string): Promise<GetAverageResponse> {
        const trades = await this.binanceApiTradeService.myTrades(symbol);
        return this.getAverageNumbers(trades);
    }

    async getAveragegetAverageAllFiat(coin: string): Promise<GetAverageResponse> {
        const symbols = [];
        for (const key in CRYPTO_CODE.FIAT) {
            symbols.push(`${coin}${CRYPTO_CODE.FIAT[key]}`);
        }
        const trades = [];
        for (const symbol of symbols) {
            trades.push(...(await this.binanceApiTradeService.myTrades(symbol)));
        }
        return this.getAverageNumbers(trades);
    }

    async getAverageNumbers(trades: BinanceTrade[]): Promise<GetAverageResponse> {
        let buyAmountTotal = 0;
        let sellAmountTotal = 0;
        let buyCoins = 0;
        let sellCoins = 0;
        for (const trade of trades) {
            if (trade.isBuyer) {
                buyAmountTotal += trade.quoteQty;
                buyCoins += trade.qty;
            } else {
                sellAmountTotal += trade.quoteQty;
                sellCoins += trade.qty;
            }
        }
        const buyAverage = buyCoins === 0 ? 0 : buyAmountTotal / buyCoins;
        const sellAverage = sellCoins === 0 ? 0 : sellAmountTotal / sellCoins || 0;
        let performance = sellAmountTotal - buyAmountTotal;
        if (sellCoins > buyCoins) {
            performance = performance - (sellCoins - buyCoins) * sellAverage;
        }
        if (sellCoins < buyCoins) {
            performance = performance + (buyCoins - sellCoins) * (await this.getCurrentSymbolPrice(trades[0].symbol));
        }
        return {
            buyAverage,
            sellAverage,
            performance
        };
    }

    getCurrentSymbolPrice(symbol: string): Promise<number> {
        return this.binanceApiMarketService.symbolPriceTicker(symbol);
    }
}
