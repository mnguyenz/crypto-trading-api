import { Column, Entity, Index, OneToOne } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Interval } from '@binance/connector-typescript';
import { SymbolEntity } from './symbol.entity';

@Entity('Kline')
@Index(['symbolId', 'interval', 'closeTime'], { unique: true })
export class KlineEntity extends CoreEntity {
    @OneToOne(() => SymbolEntity)
    symbol: SymbolEntity;

    @Column()
    symbolId: number;

    @Column({ type: 'enum', enum: Interval })
    interval: Interval;

    @Column({ type: 'bigint' })
    openTime: bigint;

    @Column('numeric')
    openPrice: number;

    @Column('numeric')
    highPrice: number;

    @Column('numeric')
    lowPrice: number;

    @Column('numeric')
    closePrice: number;

    @Column('numeric')
    volume: number;

    @Column({ type: 'bigint' })
    closeTime: bigint;

    @Column('numeric')
    quoteAssetVolume: number;

    @Column()
    numberOfTrades: number;

    @Column('numeric')
    takerBuyBaseAssetVolume: number;

    @Column('numeric')
    takerBuyQuoteAssetVolume: number;
}
