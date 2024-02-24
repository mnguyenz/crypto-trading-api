import { Module } from '@nestjs/common';
import { AlgorithmAdxMacdService } from './services/algorithm-adx-macd.service';
import { BacktestService } from './services/backtest.service';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';
import { KlineRepository } from '~klines/kline.repository';
import { BacktestController } from './controllers/backtest.controller';
import { AlgorithmRepository } from './algorithm.repository';

@Module({
    imports: [TypeOrmHelperModule.forCustomRepository([AlgorithmRepository, KlineRepository])],
    controllers: [BacktestController],
    providers: [BacktestService, AlgorithmAdxMacdService],
    exports: []
})
export class AlgorithmModule {}
