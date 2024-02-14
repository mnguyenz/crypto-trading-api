import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAverageResponse } from '~average-calculation/responses/get-average.response';
import { AverageCalculationService } from '~average-calculation/services/average-calculation.service';

@Controller('average-calculation')
@ApiTags('Average Calculation')
export class AverageCalculationController {
    constructor(private averageCalculationService: AverageCalculationService) {}

    @Get('symbol/:symbol')
    getAverage(@Param('symbol') symbol: string): Promise<GetAverageResponse> {
        return this.averageCalculationService.getAverage(symbol);
    }

    @Get('all-fiat/:coin')
    getAverageAllFiat(@Param('coin') coin: string): Promise<GetAverageResponse> {
        return this.averageCalculationService.getAveragegetAverageAllFiat(coin);
    }
}
