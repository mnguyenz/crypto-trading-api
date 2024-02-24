import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import axios from 'axios';
import { BINANCE_CLIENT } from '~core/constants/binance.constant';
import { Interval } from '@binance/connector-typescript';
import { KlineRepository } from '~klines/kline.repository';

@Injectable()
export class BinanceApiMarketService {
    constructor(private klineRepository: KlineRepository) {}

    async getKLines(symbol: string, interval: Interval, limit?: number): Promise<void> {
        if (limit) {
            const klineCandlestickData = await BINANCE_CLIENT.klineCandlestickData(symbol, Interval['1m'], { limit });
            return this.upsertKLineToDB(symbol, interval, klineCandlestickData);
        } else {
            let endTime = Date.now() * 1000;
            while (true) {
                const klineCandlestickData = await BINANCE_CLIENT.klineCandlestickData(symbol, interval, { endTime });
                await this.upsertKLineToDB(symbol, interval, klineCandlestickData);
                if (klineCandlestickData.length === 0) {
                    break;
                } else {
                    endTime = (klineCandlestickData[0][0] as number) - 1;
                }
            }
        }
    }

    async upsertKLineToDB(symbol: string, interval: Interval, klineCandlestickData: any): Promise<void> {
        for (const kLine of klineCandlestickData) {
            await this.klineRepository.upsert(
                {
                    symbol: symbol,
                    interval: interval,
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
                ['symbol', 'interval', 'closeTime']
            );
        }
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
