import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { LocusService } from './app/locus.service';
import { GetLocusQueryDto } from './app/get-locus-query.dto';

@Controller('locus')
export class LocusController {
  constructor(private locusService: LocusService) {}

  @ApiOperation({
    summary: 'Get paginated list of locus',
    description:
      'Retrieve a paginated list of loci with the option to filter and sort the results.',
  })
  @Get()
  getLocus(@Query() getLocusQuery: GetLocusQueryDto) {
    return this.locusService.getLocus(getLocusQuery);
  }
}
