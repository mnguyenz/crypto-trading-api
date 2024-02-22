import { OrderType, Side } from '@binance/connector-typescript';
import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { BinanceApiTradeService } from '~binance-api/services/binance-api-trade.service';

@Injectable()
export class BinanceApiTradeTask {
    constructor(private binanceApiTradeService: BinanceApiTradeService) {}

    // @Cron(CronExpression.EVERY_10_SECONDS)
    async sellPIXEL(): Promise<void> {
        console.log('MinhDebug sellPIXEL');
        this.binanceApiTradeService.newOrder(
            {
                symbol: 'PIXELFDUSD',
                side: Side.SELL,
                type: OrderType.LIMIT,
                price: 1,
                quantity: 100
            },
            0
        );
        this.binanceApiTradeService.newOrder(
            {
                symbol: 'PIXELFDUSD',
                side: Side.SELL,
                type: OrderType.LIMIT,
                price: 1.5,
                quantity: 47
            },
            0
        );
    }
}
