import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './infra/db';

import { LocusModule } from './modules/locus';
import { LocusMemberModule } from './modules/locus-member';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    LocusModule,
    LocusMemberModule,
    AuthModule,
  ],
})
export class AppModule {}
