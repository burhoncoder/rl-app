import { Controller, Get } from '@nestjs/common';
import { LocusService } from './app/locus.service';

@Controller('locus')
export class LocusController {
  constructor(private locusService: LocusService) {}

  @Get()
  getLocus() {
    return this.locusService.getLocus();
  }
}
