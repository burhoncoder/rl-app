import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LocusEntity } from '../domain/locus.entity';
import { LocusRepository } from '../infra/locus.repository';

import { GetLocusQueryDto } from './get-locus-query.dto';

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(LocusEntity) private locusRepository: LocusRepository,
  ) {}

  getLocus(filters: GetLocusQueryDto) {
    return this.locusRepository.findLocus(filters);
  }
}
