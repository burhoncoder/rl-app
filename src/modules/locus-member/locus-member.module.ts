import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocusMemberEntity } from './domain/locus-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocusMemberEntity])],
  controllers: [],
  providers: [],
})
export class LocusMemberModule {}
