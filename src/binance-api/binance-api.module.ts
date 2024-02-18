import { Module } from '@nestjs/common';
import { BinanceApiTradeService } from './services/binance-api-trade.service';
import { BinanceApiHelperService } from './services/binance-api-helper.service';
import { BinanceApiMarketService } from './services/binance-api-market.service';
import { BinanceApiWalletController } from './controllers/binance-api-wallet.controller';
import { BinanceApiWalletService } from './services/binance-api-wallet.service';
import { SymbolRepository } from '~symbols/repositories/symbol.repository';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';

@Module({
    imports: [TypeOrmHelperModule.forCustomRepository([SymbolRepository])],
    controllers: [BinanceApiWalletController],
    providers: [BinanceApiHelperService, BinanceApiTradeService, BinanceApiMarketService, BinanceApiWalletService],
    exports: [BinanceApiHelperService, BinanceApiTradeService, BinanceApiMarketService]
})
export class BinanceApiModule {}
