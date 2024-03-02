import { Interval } from '@binance/connector-typescript';
import { Inject, Injectable } from '@nestjs/common';
import { KlineRepository } from '~klines/kline.repository';
import { AlgorithmAdxMacdService } from './algorithm-adx-macd.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BacktestService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private klineRepository: KlineRepository,
        private algorithmAdxMacdService: AlgorithmAdxMacdService
    ) {}

    async backtestAdxMacd(symbol: string, interval: Interval): Promise<void> {
        const prices = await this.klineRepository.find({
            where: {
                symbol: symbol,
                interval: interval
            },
            order: {
                closeTime: 'ASC'
            }
        });
        await this.cacheManager.set('Good', 0, 0);
        await this.cacheManager.set('Bad', 0, 0);
        for (let i = 50; i < prices.length; i++) {
            const adxInput = {
                high: prices.slice(0, i).map((kline) => kline.highPrice),
                low: prices.slice(0, i).map((kline) => kline.lowPrice),
                close: prices.slice(0, i).map((kline) => kline.closePrice),
                period: 14
            };
            const macdInput = {
                values: prices.slice(0, i).map((kline) => kline.closePrice),
                SimpleMAOscillator: false,
                SimpleMASignal: false,
                fastPeriod: 12,
                slowPeriod: 26,
                signalPeriod: 9
            };
            await this.algorithmAdxMacdService.algorithmAdxMacd(adxInput, macdInput);
        }
    }
}
