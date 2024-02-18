import { Global, Module } from '@nestjs/common';
import { BinanceSocketUserDataGateway } from './gateway/binance-socket-user-data.gateway';
import { WebsocketStream } from '@binance/connector-typescript';

@Global()
@Module({
    imports: [],
    providers: [BinanceSocketUserDataGateway, WebsocketStream],
    exports: []
})
export class BinanceSocketModule {}
