import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BinanceApiWalletService } from '~binance-api/services/binance-api-wallet.service';
import { BinanceSymbol } from '~binance-api/types/binance-symbol.type';

@Controller('binance-api/wallet')
@ApiTags('Binance API Wallet')
export class BinanceApiWalletController {
    constructor(private binanceApiMarketService: BinanceApiWalletService) {}

    @Get('get-trade-fee')
    getTradeFee(): Promise<BinanceSymbol[]> {
        return this.binanceApiMarketService.getTradeFeeData();
    }
}
