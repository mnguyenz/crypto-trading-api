import { Injectable } from '@nestjs/common';
import { MONITOR_SYMBOLS } from '~binance-api/constants/monitor-symbols.constant';
import { BinanceApiMarketService } from '~binance-api/services/binance-api-market.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EVERY_3_MINUTES } from '~core/constants/cronjob.constant';
import { Interval } from '@binance/connector-typescript';

@Injectable()
export class BinanceApiMarketTask {
    constructor(private binanceApiMarketService: BinanceApiMarketService) {}

    // @Cron(CronExpression.EVERY_MINUTE)
    async get1mKLines(): Promise<void> {
        for (const symbol of MONITOR_SYMBOLS) {
            this.binanceApiMarketService.getKLines(symbol, Interval['1m'], 2);
        }
    }

    // @Cron(EVERY_3_MINUTES)
    async get3mKLines(): Promise<void> {
        for (const symbol of MONITOR_SYMBOLS) {
            this.binanceApiMarketService.getKLines(symbol, Interval['3m'], 2);
        }
    }

    // @Cron(CronExpression.EVERY_5_MINUTES)
    async get5mKLines(): Promise<void> {
        for (const symbol of MONITOR_SYMBOLS) {
            this.binanceApiMarketService.getKLines(symbol, Interval['5m'], 2);
        }
    }
}
