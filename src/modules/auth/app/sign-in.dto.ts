import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum Roles {
  ADMIN = 'admin',
  NORMAL = 'normal',
  LIMITED = 'limited',
}

export class SignInDto {
  @ApiProperty({
    description: 'The role of the user',
    required: true,
    enum: Roles,
  })
  @IsEnum(Roles)
  role: Roles;
}
