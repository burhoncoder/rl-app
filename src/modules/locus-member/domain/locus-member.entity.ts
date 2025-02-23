import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { LocusEntity } from '../../locus/domain/locus.entity';

@Entity('rnc_locus_members')
export class LocusMemberEntity {
  @ApiProperty({
    description: 'Unique identifier of the locus member',
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'id' })
  locusMemberId: number;

  @ApiProperty({
    description: 'Region ID associated with the locus member',
    example: 100,
  })
  @Column()
  regionId: number;

  @ApiProperty({
    description: 'Locus ID associated with the locus member',
    example: 10,
  })
  @Column()
  locusId: number;

  @ApiProperty({
    description: 'Membership status of the locus member',
    example: 'Active',
  })
  @Column()
  membershipStatus: string;

  @ManyToOne(() => LocusEntity, (locus) => locus.locusMembers)
  locus: LocusEntity;
}
