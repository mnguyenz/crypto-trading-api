import { Injectable } from '@nestjs/common';
import { SymbolRepository } from '~symbols/symbol.repository';
import { BinanceSymbol } from '~binance-api/types/binance-symbol.type';
import { BINANCE_CLIENT } from '~core/constants/binance.constant';
import { BinanceFilterType } from '~binance-api/enums/binance-filter-type.enum';
import { keyBy } from 'lodash';

@Injectable()
export class BinanceApiWalletService {
    constructor(private symbolRepository: SymbolRepository) {}

    async getExchangeInfo(): Promise<BinanceSymbol[]> {
        try {
            const [exchangeInformation, tradeFees] = await Promise.all([
                BINANCE_CLIENT.exchangeInformation(),
                BINANCE_CLIENT.tradeFee()
            ]);
            let { symbols } = exchangeInformation;
            symbols = symbols.filter((symbol) => symbol.status === 'TRADING');
            const tradeFeeSymbolMap = keyBy(tradeFees, 'symbol');
            const symbolData: BinanceSymbol[] = [];
            for (const sb of symbols) {
                const { symbol, baseAsset, quoteAsset, filters } = sb;
                const { tickSize } = filters.find(
                    (filter) => filter.filterType === BinanceFilterType.PRICE_FILTER
                ) as any;
                const { stepSize } = filters.find((filter) => filter.filterType === BinanceFilterType.LOT_SIZE) as any;
                symbolData.push({
                    symbol,
                    baseAsset,
                    quoteAsset,
                    priceTickSize: tickSize,
                    lotStepSize: stepSize,
                    makerCommission: tradeFeeSymbolMap[symbol].makerCommission,
                    takerCommission: tradeFeeSymbolMap[symbol].takerCommission
                });
            }
            return symbolData;
        } catch (error) {
            return error;
        }
    }

    async getExchangeInfoData(): Promise<BinanceSymbol[]> {
        const exchangeInfo = await this.getExchangeInfo();
        await this.symbolRepository.upsert(exchangeInfo, ['symbol']);
        return exchangeInfo;
    }
}
