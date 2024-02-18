import { Column, Entity } from 'typeorm';
import { CoreEntity } from './core.entity';

@Entity('Symbol')
export class SymbolEntity extends CoreEntity {
    @Column()
    symbol: string;

    @Column()
    baseAsset: string;

    @Column()
    quoteAsset: string;

    @Column()
    makerCommission: number;

    @Column()
    takerCommission: number;
}
