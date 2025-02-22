import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { LocusEntity } from '../domain/locus.entity';
import { GetLocusQueryDto } from '../app/get-locus-query.dto';

@Injectable()
export class LocusRepository extends Repository<LocusEntity> {
  findLocus(filters: GetLocusQueryDto) {
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

    const queryBuilder = this.createQueryBuilder('locus');

    queryBuilder.leftJoinAndSelect('locus.locusMembers', 'locusMember');

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

    if (sort) {
      queryBuilder.orderBy(`locus.${sort}`, 'ASC');
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    if (sideLoad === 'locusMembers') {
      queryBuilder.addSelect('locusMember');
    }

    return queryBuilder.getMany();
  }
}
