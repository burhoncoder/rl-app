import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createPaginatedResult } from '../../../utils';

import { LocusEntity } from '../domain/locus.entity';
import { GetLocusQueryFilter } from '../app/get-locus-query.filter';

@Injectable()
export class LocusRepository {
  constructor(
    @InjectRepository(LocusEntity)
    private locusRepository: Repository<LocusEntity>,
  ) {}

  async findLocus(filters: GetLocusQueryFilter) {
    const {
      id,
      assemblyId,
      regionIds,
      membershipStatus,
      sideLoad,
      page,
      limit,
      sort,
    } = filters;

    const queryBuilder = this.locusRepository.createQueryBuilder('locus');

    if (
      regionIds.length > 0 ||
      membershipStatus ||
      sideLoad === 'locusMembers'
    ) {
      queryBuilder.leftJoin('locus.locusMembers', 'locusMember');
    }

    if (id) {
      queryBuilder.andWhere('locus.id = :id', { id });
    }

    if (assemblyId) {
      queryBuilder.andWhere('locus.assemblyId = :assemblyId', { assemblyId });
    }

    if (regionIds.length > 0) {
      queryBuilder.andWhere('locusMember.regionId IN (:...regionIds)', {
        regionIds,
      });
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
