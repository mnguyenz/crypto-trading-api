import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketStream } from '@binance/connector-typescript';

@Injectable()
export class BinanceSocketGateway implements OnModuleInit {
    constructor(private client: WebsocketStream) {}

    onModuleInit() {
        console.log('hooooy');
        const callbacks = {
            open: () => console.debug('Connected to WebSocket server'),
            close: () => console.debug('Disconnected from WebSocket server'),
            message: (data: string) => console.info(JSON.parse(data))
        };

        this.client = new WebsocketStream({ callbacks });
        console.log(this.client);
        this.client.userData('9hZXLFBYvBpUgxQ4XsAEVvphDTIkmKW7N6eRYRXizEznUUyiYbg3DKbygi3G');
        // setTimeout(() => this.client.disconnect(), 3000);
    }
}
