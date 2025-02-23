import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { LocusMemberEntity } from '../../locus-member/domain/locus-member.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rnc_locus')
export class LocusEntity {
  @ApiProperty({
    description: 'Unique identifier of the locus',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Assembly ID associated with the locus',
    example: 'A001',
  })
  @Column()
  assemblyId: string;

  @ApiProperty({
    description: 'Name of the locus',
    example: 'Locus 1',
  })
  @Column()
  locusName: string;

  @ApiProperty({
    description: 'Public name of the locus',
    example: 'Public Locus 1',
  })
  @Column()
  publicLocusName: string;

  @ApiProperty({
    description: 'Chromosome where the locus is located',
    example: 'Chromosome 1',
  })
  @Column()
  chromosome: string;

  @ApiProperty({
    description: 'Strand direction of the locus',
    example: '+',
  })
  @Column()
  strand: string;

  @ApiProperty({
    description: 'Start position of the locus',
    example: 100,
  })
  @Column()
  locusStart: number;

  @Column()
  @ApiProperty({
    description: 'End position of the locus',
    example: 200,
  })
  @Column()
  locusStop: number;

  @ApiProperty({
    description: 'Total count of members in this locus',
    example: 10,
  })
  @Column()
  memberCount: number;

  @ApiProperty({
    description: 'Members associated with this locus',
    type: () => LocusMemberEntity,
    isArray: true,
  })
  @OneToMany(() => LocusMemberEntity, (locusEntity) => locusEntity.locus, {
    eager: false,
  })
  locusMembers: LocusMemberEntity[];
}
