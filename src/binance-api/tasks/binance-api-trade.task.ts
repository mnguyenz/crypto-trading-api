import { OrderType, Side, TimeInForce } from '@binance/connector-typescript';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BinanceApiTradeService } from '~binance-api/services/binance-api-trade.service';

@Injectable()
export class BinanceApiTradeTask {
    constructor(private binanceApiTradeService: BinanceApiTradeService) {}

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // async sellPIXEL(): Promise<void> {
    //     console.log('MinhDebug sellPIXEL');
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PIXELFDUSD',
    //             side: Side.SELL,
    //             type: OrderType.LIMIT,
    //             price: 1,
    //             quantity: 100
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PIXELFDUSD',
    //             side: Side.SELL,
    //             type: OrderType.LIMIT,
    //             price: 1.5,
    //             quantity: 47
    //         },
    //         0
    //     );
    // }

    // @Cron(CronExpression.EVERY_HOUR)
    // async sellPORTAL(): Promise<void> {
    //     console.log('MinhDebug sellPORTAL');
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.SELL,
    //             type: OrderType.LIMIT,
    //             price: 20,
    //             quantity: 11,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.SELL,
    //             type: OrderType.LIMIT,
    //             price: 40,
    //             quantity: 8.8,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALUSDT',
    //             side: Side.SELL,
    //             type: OrderType.LIMIT,
    //             price: 20,
    //             quantity: 11,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALUSDT',
    //             side: Side.SELL,
    //             type: OrderType.LIMIT,
    //             price: 40,
    //             quantity: 8.8,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.1,
    //             quantity: 1000,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.2,
    //             quantity: 1000,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.3,
    //             quantity: 1000,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.4,
    //             quantity: 1000,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALFDUSD',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.5,
    //             quantity: 1000,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALUSDT',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.1,
    //             quantity: 200,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    //     this.binanceApiTradeService.newOrder(
    //         {
    //             symbol: 'PORTALUSDT',
    //             side: Side.BUY,
    //             type: OrderType.LIMIT,
    //             price: 0.2,
    //             quantity: 100,
    //             timeInForce: TimeInForce.GTC
    //         },
    //         0
    //     );
    // }
}
