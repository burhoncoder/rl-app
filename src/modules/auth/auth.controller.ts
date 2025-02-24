import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './app/auth.service';
import { SignInDto } from './app/sign-in.dto';
import { Public } from './app/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
