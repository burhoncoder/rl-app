import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { PaginationDto } from '../../../core/dto';

export enum SortValues {
  ID = 'id',
  ASSEMBLY_ID = 'assemblyId',
  LOCUS_START = 'locusStart',
  LOCUST_STOP = 'locusStop',
}

export enum SideLoadValues {
  LOCUS_MEMBERS = 'locusMembers',
}

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
    enum: SideLoadValues,
  })
  @IsEnum(SideLoadValues)
  @IsOptional()
  sideLoad?: SideLoadValues;

  @ApiProperty({
    description: 'Sort field',
    required: false,
    enum: SortValues,
    default: 'id',
  })
  @IsEnum(SortValues)
  @IsOptional()
  sort: SortValues = SortValues.ID;
}
