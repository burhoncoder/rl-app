import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LocusEntity } from '../domain/locus.entity';
import { LocusRepository } from '../infra/locus.repository';

import { GetLocusQueryDto } from './get-locus-query.dto';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(LocusEntity) private locusRepository: LocusRepository,
  ) {}

  getLocus(filters: GetLocusQueryDto) {
    const options: FindManyOptions<LocusEntity> = {
      take: 50,
    };

    if (filters.id) {
      options.where = {
        id: filters.id,
      };
    }

    if (filters.assemblyId) {
      options.where = {
        ...options.where,
        assemblyId: filters.assemblyId,
      };
    }

    return this.locusRepository.find(options);
  }
}
