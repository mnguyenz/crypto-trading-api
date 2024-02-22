import { Module } from '@nestjs/common';
import { BinanceApiTradeService } from './services/binance-api-trade.service';
import { BinanceApiHelperService } from './services/binance-api-helper.service';
import { BinanceApiMarketService } from './services/binance-api-market.service';
import { BinanceApiWalletController } from './controllers/binance-api-wallet.controller';
import { BinanceApiWalletService } from './services/binance-api-wallet.service';
import { SymbolRepository } from '~symbols/symbol.repository';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';
import { BinanceApiTradeTask } from './tasks/binance-api-trade.task';
import { KlineRepository } from '~klines/kline.repository';
import { BinanceApiMarketTask } from './tasks/binance-api-market.task';

@Module({
    imports: [TypeOrmHelperModule.forCustomRepository([SymbolRepository, KlineRepository])],
    controllers: [BinanceApiWalletController],
    providers: [
        BinanceApiHelperService,
        BinanceApiTradeService,
        BinanceApiMarketService,
        BinanceApiWalletService,
        BinanceApiTradeTask,
        BinanceApiMarketTask
    ],
    exports: [BinanceApiHelperService, BinanceApiTradeService, BinanceApiMarketService]
})
export class BinanceApiModule {}
