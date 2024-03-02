import { Global, Module } from '@nestjs/common';
import { BinanceSocketUserDataGateway } from './gateway/binance-socket-user-data.gateway';
import { WebsocketStream } from '@binance/connector-typescript';
import { BinanceSocketOrderService } from './services/binance-socket-order.service';

@Global()
@Module({
    imports: [],
    providers: [BinanceSocketUserDataGateway, WebsocketStream, BinanceSocketOrderService],
    exports: []
})
export class BinanceSocketModule {}
