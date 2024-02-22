import { Injectable } from '@nestjs/common';
import { MONITOR_SYMBOLS } from '~binance-api/constants/monitor-symbols.constant';
import { BinanceApiMarketService } from '~binance-api/services/binance-api-market.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BinanceApiMarketTask {
    constructor(private binanceApiMarketService: BinanceApiMarketService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async get1mKLines(): Promise<void> {
        for (const symbol of MONITOR_SYMBOLS) {
            this.binanceApiMarketService.get1mKLines(symbol);
        }
    }
}
