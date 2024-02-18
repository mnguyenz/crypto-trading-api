import { Injectable, SetMetadata } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomRepository } from '~core/decorators/custom-repository.decorator';
import { SymbolEntity } from '~entities/symbol.entity';

@CustomRepository(SymbolEntity)
export class SymbolRepository extends Repository<SymbolEntity> {}
