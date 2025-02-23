import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocusEntity } from '../domain/locus.entity';
import { GetLocusQueryDto } from '../app/get-locus-query.dto';
import { createPaginatedResult } from '../../../utils';

@Injectable()
export class LocusRepository {
  constructor(
    @InjectRepository(LocusEntity)
    private locusRepository: Repository<LocusEntity>,
  ) {}

  async findLocus(filters: GetLocusQueryDto) {
    const {
      id,
      assemblyId,
      regionId,
      membershipStatus,
      sideLoad,
      page,
      limit,
      sort,
    } = filters;

    const queryBuilder = this.locusRepository.createQueryBuilder('locus');

    if (regionId || membershipStatus || sideLoad === 'locusMembers') {
      queryBuilder.leftJoin('locus.locusMembers', 'locusMember');
    }

    if (id) {
      queryBuilder.andWhere('locus.id = :id', { id });
    }

    if (assemblyId) {
      queryBuilder.andWhere('locus.assemblyId = :assemblyId', { assemblyId });
    }

    if (regionId) {
      queryBuilder.andWhere('locusMember.regionId = :regionId', { regionId });
    }

    if (membershipStatus) {
      queryBuilder.andWhere(
        'locusMember.membershipStatus = :membershipStatus',
        { membershipStatus },
      );
    }

    if (sideLoad === 'locusMembers') {
      queryBuilder.addSelect('locusMember');
    }

    queryBuilder.skip((page - 1) * limit).take(limit);
    queryBuilder.orderBy(`locus.${sort}`, 'ASC');

    const result = await queryBuilder.getManyAndCount();
    return createPaginatedResult({
      items: result[0],
      totalItems: result[1],
      limit,
      page,
    });
  }
}
