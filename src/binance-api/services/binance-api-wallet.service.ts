import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import { SymbolRepository } from '~symbols/repositories/symbol.repository';
import { Spot } from '@binance/connector-typescript';
import { BinanceSymbol } from '~binance-api/types/binance-symbol.type';
import { getAssetsFromSymbol } from '~core/utils/string.util';

@Injectable()
export class BinanceApiWalletService {
    constructor(private symbolRepository: SymbolRepository) {}

    async getTradeFee(): Promise<BinanceSymbol[]> {
        const client = new Spot(env.BINANCE.API_KEY, env.BINANCE.API_SECRET, { baseURL: env.BINANCE.API_URL });

        try {
            const tradeFees = await client.tradeFee();
            const tradeFeesData: BinanceSymbol[] = [];
            for (const tradeFee of tradeFees) {
                const { baseAsset, quoteAsset } = getAssetsFromSymbol(tradeFee.symbol);
                tradeFeesData.push({
                    symbol: tradeFee.symbol,
                    makerCommission: +tradeFee.makerCommission,
                    takerCommission: +tradeFee.takerCommission,
                    baseAsset,
                    quoteAsset
                });
            }
            return tradeFeesData;
        } catch (error) {
            return error;
        }
    }

    async getTradeFeeData(): Promise<BinanceSymbol[]> {
        const tradeFees = await this.getTradeFee();
        await this.symbolRepository.upsert(tradeFees, ['symbol']);
        return tradeFees;
    }
}
