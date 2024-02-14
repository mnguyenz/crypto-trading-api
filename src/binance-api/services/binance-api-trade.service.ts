import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import axios from 'axios';
import { BinanceApiHelperService } from './binance-api-helper.service';
import { BinanceTrade } from '~binance-api/types/binance-trade.type';

@Injectable()
export class BinanceApiTradeService {
    constructor(private binanceApiHelperService: BinanceApiHelperService) {}

    async myTrades(symbol: string): Promise<BinanceTrade[]> {
        const timestamp = Date.now();
        const params = {
            symbol,
            timestamp
        };
        const queryString = Object.keys(params)
            .map((key) => {
                return `${key}=${params[key]}`;
            })
            .join('&');

        const signature = this.binanceApiHelperService.buildSign(queryString);
        const headers = {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': env.BINANCE.API_KEY
        };

        try {
            const myTradesResponse = await axios.get(`${env.BINANCE.API_URL}/api/v3/myTrades`, {
                params: {
                    ...params,
                    signature
                },
                headers
            });
            const trades: BinanceTrade[] = [];
            for (const trade of myTradesResponse.data) {
                trades.push({
                    symbol: trade.symbol,
                    price: +trade.price,
                    qty: +trade.qty,
                    quoteQty: +trade.quoteQty,
                    commission: +trade.commission,
                    commissionAsset: trade.commissionAsset,
                    isBuyer: trade.isBuyer
                });
            }
            return trades;
        } catch (error) {
            if (error.response.data.code === -1121) {
                return [];
            }
            return error;
        }
    }
}
