import { Global, Module } from '@nestjs/common';
import { BinanceSocketGateway } from './gateway/binance-socket.gateway';
import { WebsocketStream } from '@binance/connector-typescript';

@Global()
@Module({
    imports: [],
    providers: [BinanceSocketGateway, WebsocketStream],
    exports: []
})
export class SocketModule {}
