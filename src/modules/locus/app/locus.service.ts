import { ForbiddenException, Injectable } from '@nestjs/common';

import { ActiveUserType, Roles } from '../../auth';

import { LocusRepository } from '../infra/locus.repository';

import { GetLocusQueryDto, SideLoadValues } from './get-locus-query.dto';
import { GetLocusQueryFilter } from './get-locus-query.filter';

@Injectable()
export class LocusService {
  private limitedUserRegionIds = [86118093, 86696489, 88186467];

  constructor(private locusRepository: LocusRepository) {}

  getLocus(filters: GetLocusQueryDto, user: ActiveUserType) {
    if (
      user.role === Roles.NORMAL &&
      filters.sideLoad === SideLoadValues.LOCUS_MEMBERS
    ) {
      throw new ForbiddenException(
        'User normal do not have permissions to load locusMembers',
      );
    }

    if (user.role === Roles.LIMITED && filters.regionId) {
      throw new ForbiddenException('User limited can not user regionId filter');
    }

    const normalizedFilters: GetLocusQueryFilter = {
      ...filters,
      regionIds:
        user.role === Roles.LIMITED
          ? this.limitedUserRegionIds
          : filters.regionId
            ? [filters.regionId]
            : [],
    };

    return this.locusRepository.findLocus(normalizedFilters);
  }
}
