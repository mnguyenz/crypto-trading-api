import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AverageCalculationModule } from '~average-calculation/average-calculation.module';
import { BinanceApiModule } from '~binance-api/binance-api.module';
import { BinanceSocketModule } from '~binance-socket/binance-socket.module';
import { databaseConfig } from '~config/database.config';
import { scheduleConfig } from '~config/schedule.config';
import { AlgorithmModule } from '~algorithm/algorithm.module';

@Module({
    imports: [
        databaseConfig,
        scheduleConfig,
        BinanceApiModule,
        AverageCalculationModule,
        BinanceSocketModule,
        AlgorithmModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
