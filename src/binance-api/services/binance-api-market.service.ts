import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import axios from 'axios';

@Injectable()
export class BinanceApiMarketService {
    constructor() {}

    async symbolPriceTicker(symbol: string): Promise<number> {
        const headers = { 'Content-Type': 'application/json' };

        try {
            const symbolPriceTickerResponse = await axios.get(`${env.BINANCE.API_URL}/api/v3/ticker/price`, {
                params: { symbol },
                headers
            });
            return symbolPriceTickerResponse.data.price;
        } catch (error) {
            return error;
        }
    }
}
