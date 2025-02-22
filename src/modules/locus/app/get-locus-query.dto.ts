import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '../../../core/dto';
import { LocusEntity } from '../domain/locus.entity';

type LocusSortKeys = Exclude<keyof LocusEntity, 'locusMembers'>;

const locusEntityKeys = Object.keys(LocusEntity.prototype).filter(
  (key) => key !== 'locusMembers',
);

export class GetLocusQueryDto extends PaginationDto {
  @ApiProperty({
    description: 'ID of the locus',
    required: false,
  })
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Assembly ID of the locus',
    required: false,
  })
  @IsString()
  @IsOptional()
  assemblyId?: string;

  @ApiProperty({
    description: 'Region ID to filter by',
    required: false,
  })
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  regionId?: number;

  @ApiProperty({
    description: 'Membership status to filter by',
    required: false,
  })
  @IsString()
  @IsOptional()
  membershipStatus?: string;

  @IsOptional()
  @IsEnum(['locusMembers'])
  @ApiProperty({
    description: 'Side load parameter (use "locusMembers" for sideloading)',
    required: false,
    enum: ['locusMembers'],
  })
  sideLoad?: 'locusMembers';

  @ApiProperty({
    description: 'Sort field (e.g., "id")',
    required: false,
    default: 'id',
  })
  @IsString()
  @IsOptional()
  @IsEnum(locusEntityKeys)
  sort: LocusSortKeys = 'id';
}
