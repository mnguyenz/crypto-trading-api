import { Injectable } from '@nestjs/common';
import * as indicator from 'technicalindicators';
import { ADXInput } from 'technicalindicators/declarations/directionalmovement/ADX';
import { MACDInput } from 'technicalindicators/declarations/moving_averages/MACD';
import { AlgorithmRepository } from '~algorithm/algorithm.repository';

@Injectable()
export class AlgorithmAdxMacdService {
    constructor(private algorithmRepository: AlgorithmRepository) {}

    async algorithmAdxMacd(inputDMI: ADXInput, macdInput: MACDInput): Promise<void> {
        const adxArray = indicator.adx(inputDMI);
        const { pdi, mdi } = adxArray[adxArray.length - 1];

        const macdArray = indicator.macd(macdInput);
        const { MACD, signal } = macdArray[macdArray.length - 1];

        const longCheck = pdi > mdi && MACD > signal;
        const shortCheck = mdi > pdi && signal > MACD;

        let trade: number = 0;
        const algorithmData = await this.algorithmRepository.findOneBy({ id: 1 });
        const { adxMacdPreviousTrade, adxMacdSumBuy, adxMacdSumSell } = algorithmData;
        if (trade === 0 && longCheck) {
            trade = 1;
        } else if (trade === 0 && shortCheck) {
            trade = -1;
        } else if (trade === 1 && shortCheck) {
            trade = -1;
        } else if (trade === -1 && longCheck) {
            trade = 1;
        } else {
            trade = adxMacdPreviousTrade;
        }
        const price = macdInput.values[macdInput.values.length - 1];
        if (adxMacdPreviousTrade !== 1 && trade === 1) {
            console.log('BUY');
            await this.algorithmRepository.update(
                { id: 1 },
                {
                    adxMacdPreviousTrade: trade,
                    adxMacdSumBuy: adxMacdSumBuy + price
                }
            );
        }
        if (adxMacdPreviousTrade !== -1 && trade === -1) {
            console.log('SELL');
            await this.algorithmRepository.update(
                { id: 1 },
                {
                    adxMacdPreviousTrade: trade,
                    adxMacdSumSell: adxMacdSumSell + price
                }
            );
        }
    }
}
