import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketStream } from '@binance/connector-typescript';

@Injectable()
export class BinanceSocketUserDataGateway implements OnModuleInit {
    constructor(private client: WebsocketStream) {}

    onModuleInit() {
        console.log('hooooy');
        const callbacks = {
            open: () => console.info('Connected to User Data WebSocket Server'),
            close: () => console.error('Disconnected from User Data WebSocket Server'),
            message: (data: string) => console.info(JSON.parse(data))
        };

        this.client = new WebsocketStream({ callbacks });
        this.client.userData('9hZXLFBYvBpUgxQ4XsAEVvphDTIkmKW7N6eRYRXizEznUUyiYbg3DKcygi3G');
    }
}
