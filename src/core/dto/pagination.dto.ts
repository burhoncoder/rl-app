import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    description: 'Page of the paginated result',
    type: Number,
    required: false,
  })
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page = 1;

  @ApiProperty({
    description: 'Limit of the paginated result',
    type: Number,
    required: false,
  })
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit = 1000;
}
