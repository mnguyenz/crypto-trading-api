import { Module } from '@nestjs/common';
import { BinanceApiTradeService } from './services/binance-api-trade.service';
import { BinanceApiHelperService } from './services/binance-api-helper.service';
import { BinanceApiMarketService } from './services/binance-api-market.service';

@Module({
    imports: [],
    controllers: [],
    providers: [BinanceApiHelperService, BinanceApiTradeService, BinanceApiMarketService],
    exports: [BinanceApiHelperService, BinanceApiTradeService, BinanceApiMarketService]
})
export class BinanceApiModule {}
