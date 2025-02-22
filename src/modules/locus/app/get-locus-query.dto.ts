import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetLocusQueryDto {
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  assemblyId?: string;
}
