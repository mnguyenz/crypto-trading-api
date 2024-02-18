import { Injectable } from '@nestjs/common';
import indicator from 'technicalindicators';

@Injectable()
export class AverageDMIService {
    constructor() {}

    async getAverage(symbol?: string): Promise<number> {
        const closePrices = [10, 12, 11, 15, 14, 16, 18, 17, 19, 20];

        // Parameters for DMI calculation
        const inputDMI = {
            high: [
                /* array of high prices */
            ],
            low: [
                /* array of low prices */
            ],
            close: closePrices,
            period: 14 // Length parameter
        };

        // Calculate DMI
        // const { diPlus, diMinus, adx } = indicator.ADX(inputDMI);

        return 0;
    }
}
