import { Module } from '@nestjs/common';
import { AverageCalculationController } from './controllers/average-calculation.controller';
import { AverageCalculationService } from './services/average-calculation.service';
import { BinanceApiModule } from '~binance-api/binance-api.module';

@Module({
    imports: [BinanceApiModule],
    controllers: [AverageCalculationController],
    providers: [AverageCalculationService],
    exports: []
})
export class AverageCalculationModule {}
