import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';
import { TimestampTransformer } from '~core/timestamp.transformer';

export class CoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', transformer: new TimestampTransformer() })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', transformer: new TimestampTransformer() })
    updatedAt: number;

    @DeleteDateColumn({ type: 'timestamp', transformer: new TimestampTransformer() })
    deletedAt: number;

    @VersionColumn() revision: number;
}
