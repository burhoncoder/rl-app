import { Controller, Get, Query } from '@nestjs/common';
import { LocusService } from './app/locus.service';
import { GetLocusQueryDto } from './app/get-locus-query.dto';

@Controller('locus')
export class LocusController {
  constructor(private locusService: LocusService) {}

  @Get()
  getLocus(@Query() getLocusQuery: GetLocusQueryDto) {
    return this.locusService.getLocus(getLocusQuery);
  }
}
