import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import axios from 'axios';
import { BinanceApiHelperService } from './binance-api-helper.service';
import { BinanceTrade } from '~binance-api/types/binance-trade.type';
import { TimeInForce } from '@binance/connector-typescript';
import { NewOrderParam } from '~binance-api/types/new-order.param';
import { BINANCE_CLIENT } from '~core/constants/binance.constant';

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

    async newOrder(newOrderParam: NewOrderParam, attempedCount: number): Promise<any> {
        const { symbol, side, type, price, quantity } = newOrderParam;
        try {
            const newOrderResponse = await BINANCE_CLIENT.newOrder(symbol, side, type, {
                price,
                quantity,
                timeInForce: TimeInForce.GTC
            });
            return newOrderResponse;
        } catch (error) {
            attempedCount += 1;
            if (attempedCount < 100) {
                return await this.newOrder(newOrderParam, attempedCount);
            } else {
                return error;
            }
        }
    }
}
