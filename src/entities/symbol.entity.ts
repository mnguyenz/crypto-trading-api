import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('Symbol')
export class SymbolEntity {
    @PrimaryColumn({ unique: true })
    @Index()
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

    @Column('numeric')
    priceTickSize: number;

    @Column('numeric')
    lotStepSize: number;
}
