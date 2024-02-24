import { Interval } from '@binance/connector-typescript';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BacktestService } from '~algorithm/services/backtest.service';

@Controller('backtest')
@ApiTags('Backtest')
export class BacktestController {
    constructor(private backtestService: BacktestService) {}

    @Get('adx-macd')
    backtestAdxMacd(@Query('symbol') symbol: string, @Query('interval') interval: Interval): Promise<void> {
        return this.backtestService.backtestAdxMacd(symbol, interval);
    }
}
