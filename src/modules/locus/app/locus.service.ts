import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LocusEntity } from '../domain/locus.entity';
import { LocusRepository } from '../infra/locus.repository';

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(LocusEntity) private locusRepository: LocusRepository,
  ) {}

  getLocus() {
    return this.locusRepository.find({
      take: 50,
    });
  }
}
