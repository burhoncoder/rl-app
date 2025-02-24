import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInDto } from './sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    const token = await this.jwtService.signAsync({
      role: signInDto.role,
    });

    return { token };
  }
}
