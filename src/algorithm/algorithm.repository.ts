import { Repository } from 'typeorm';
import { CustomRepository } from '~core/decorators/custom-repository.decorator';
import { AlgorithmEntity } from '~entities/algorithm.entity';

@CustomRepository(AlgorithmEntity)
export class AlgorithmRepository extends Repository<AlgorithmEntity> {}
