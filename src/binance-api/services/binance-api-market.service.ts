import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import axios from 'axios';
import { BINANCE_CLIENT } from '~core/constants/binance.constant';
import { Interval } from '@binance/connector-typescript';
import { KlineRepository } from '~klines/kline.repository';
import { SymbolRepository } from '~symbols/symbol.repository';

@Injectable()
export class BinanceApiMarketService {
    constructor(
        private klineRepository: KlineRepository,
        private symbolRepository: SymbolRepository
    ) {}

    async get1mKLines(symbol: string): Promise<void> {
        const klineCandlestickData = await BINANCE_CLIENT.klineCandlestickData(symbol, Interval['1m'], {
            limit: 2
        });
        const kLine = klineCandlestickData[0];
        if (isNaN(+kLine[0])) {
            console.log(+kLine[0]);
        }
        if (isNaN(+kLine[6])) {
            console.log(+kLine[6]);
        }
        const symbolRepo = await this.symbolRepository.findOneBy({ symbol });
        await this.klineRepository.upsert(
            {
                symbol: symbolRepo,
                symbolId: symbolRepo.id,
                interval: Interval['1m'],
                openTime: BigInt(kLine[0]),
                openPrice: +kLine[1],
                highPrice: +kLine[2],
                lowPrice: +kLine[3],
                closePrice: +kLine[4],
                volume: +kLine[5],
                closeTime: BigInt(kLine[6]),
                quoteAssetVolume: +kLine[7],
                numberOfTrades: +kLine[8],
                takerBuyBaseAssetVolume: +kLine[9],
                takerBuyQuoteAssetVolume: +kLine[10]
            },
            ['symbolId', 'interval', 'closeTime']
        );
    }

    async symbolPriceTicker(symbol: string): Promise<number> {
        const headers = { 'Content-Type': 'application/json' };

        try {
            const symbolPriceTickerResponse = await axios.get(`${env.BINANCE.API_URL}/api/v3/ticker/price`, {
                params: { symbol },
                headers
            });
            return symbolPriceTickerResponse.data.price;
        } catch (error) {
            return error;
        }
    }
}
