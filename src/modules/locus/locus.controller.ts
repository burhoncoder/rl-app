import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { createPaginatedResponseSchema } from '../../utils/createPaginatedResponseSchema';

import { ActiveUser, ActiveUserType } from '../auth';

import { LocusEntity } from './domain/locus.entity';
import { LocusService } from './app/locus.service';
import { GetLocusQueryDto } from './app/get-locus-query.dto';

@Controller('locus')
@ApiExtraModels(LocusEntity)
export class LocusController {
  constructor(private locusService: LocusService) {}

  @ApiOperation({
    summary: 'Get paginated list of locus',
    description:
      'Retrieve a paginated list of loci with the option to filter and sort the results.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of loci',
    schema: createPaginatedResponseSchema(getSchemaPath(LocusEntity)),
  })
  @Get()
  getLocus(
    @Query() getLocusQuery: GetLocusQueryDto,
    @ActiveUser() user: ActiveUserType,
  ) {
    return this.locusService.getLocus(getLocusQuery, user);
  }
}
