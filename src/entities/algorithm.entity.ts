import { Column, Entity } from 'typeorm';
import { CoreEntity } from './core.entity';
import { ColumnNumericTransformer } from '~core/transforms/numeric.transformer';

@Entity('Algorithm')
export class AlgorithmEntity extends CoreEntity {
    @Column({ default: 0 })
    adxMacdPreviousTrade: number;

    @Column('numeric', {
        scale: 12,
        precision: 24,
        transformer: new ColumnNumericTransformer(),
        default: 0
    })
    adxMacdSumBuy: number;

    @Column('numeric', {
        scale: 12,
        precision: 24,
        transformer: new ColumnNumericTransformer(),
        default: 0
    })
    adxMacdSumSell: number;
}
