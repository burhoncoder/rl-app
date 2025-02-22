import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocusController } from './locus.controller';

import { LocusEntity } from './domain/locus.entity';
import { LocusService } from './app/locus.service';
import { LocusRepository } from './infra/locus.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocusEntity])],
  controllers: [LocusController],
  providers: [LocusService, LocusRepository],
})
export class LocusModule {}
