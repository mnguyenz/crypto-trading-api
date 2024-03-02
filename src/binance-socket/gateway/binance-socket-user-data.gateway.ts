import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketStream } from '@binance/connector-typescript';
import { SYMBOLS } from '~core/constants/crypto-code.constant';
import axios from 'axios';

@Injectable()
export class BinanceSocketUserDataGateway implements OnModuleInit {
    constructor(private client: WebsocketStream) {}

    async onModuleInit() {
        // const callbacks = {
        //     open: () => console.info('Connected to User Data WebSocket Server'),
        //     close: () => console.error('Disconnected from User Data WebSocket Server'),
        //     message: (data: string) => console.info(JSON.parse(data))
        // };

        // this.client = new WebsocketStream({ callbacks });
        // this.client.trade(SYMBOLS.ALTUSDT);
        // this.client.trade(SYMBOLS.XAIUSDT);
        // try {
        //     const responseOk = await axios.get(
        //         `https://alt.signetfaucet.com/claim/?address=tb1pd40dn3g7229qr0ue6j2nwt7lcywucj7anqktuhez66krzvzydu4sa2r0hd`
        //     );
        //     console.log('responseOk:', responseOk.data);
        // } catch (error) {
        //     console.error('Failed error message:', error.message);
        //     await new Promise((resolve) => setTimeout(resolve, 15000));
        //     return await this.onModuleInit();
        // }
    }
}
