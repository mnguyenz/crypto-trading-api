import { Column, Entity } from 'typeorm';
import { CoreEntity } from './core.entity';

@Entity('Symbol')
export class SymbolEntity extends CoreEntity {
    @Column({ unique: true })
    symbol: string;

    @Column()
    baseAsset: string;

    @Column()
    quoteAsset: string;

    @Column('numeric')
    makerCommission: number;

    @Column('numeric')
    takerCommission: number;

    @Column({ type: 'boolean', default: true })
    isTrading: boolean;
}
