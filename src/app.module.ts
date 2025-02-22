import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './infra/db';

import { LocusModule } from './modules/locus/locus.module';
import { LocusMemberModule } from './modules/locus-member/locus-member.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(databaseConfig),
    LocusModule,
    LocusMemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
