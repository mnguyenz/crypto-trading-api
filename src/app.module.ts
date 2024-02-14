import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AverageCalculationModule } from '~average-calculation/average-calculation.module';
import { BinanceApiModule } from '~binance-api/binance-api.module';

@Module({
    imports: [BinanceApiModule, AverageCalculationModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
