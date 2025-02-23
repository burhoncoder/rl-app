import { Injectable } from '@nestjs/common';

import { LocusRepository } from '../infra/locus.repository';

import { GetLocusQueryDto } from './get-locus-query.dto';

@Injectable()
export class LocusService {
  constructor(private locusRepository: LocusRepository) {}

  getLocus(filters: GetLocusQueryDto) {
    return this.locusRepository.findLocus(filters);
  }
}
