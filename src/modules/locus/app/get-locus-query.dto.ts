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

const sortValues = ['id', 'assemblyId', 'locusStart', 'locusStop'];
const sideLoadValues = ['locusMembers'];

export class GetLocusQueryDto extends PaginationDto {
  @ApiProperty({
    description: 'ID of the locus',
    type: Number,
    required: false,
  })
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Assembly ID of the locus',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  assemblyId?: string;

  @ApiProperty({
    description: 'Region ID to filter by',
    type: Number,
    required: false,
  })
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  regionId?: number;

  @ApiProperty({
    description: 'Membership status to filter by',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  membershipStatus?: string;

  @ApiProperty({
    description: 'Side load parameter',
    required: false,
    enum: sideLoadValues,
  })
  @IsEnum(sideLoadValues)
  @IsOptional()
  sideLoad?: 'locusMembers';

  @ApiProperty({
    description: 'Sort field',
    required: false,
    enum: sortValues,
    default: 'id',
  })
  @IsEnum(sortValues)
  @IsOptional()
  sort: string = 'id';
}
