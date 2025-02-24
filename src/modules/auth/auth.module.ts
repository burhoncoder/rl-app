import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../../infra/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './app/auth.service';
import { AuthGuard } from './app/auth.guard';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
