import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocusEntity } from '../../locus/domain/locus.entity';

@Entity('rnc_locus_members')
export class LocusMemberEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  locusMemberId: number;

  @Column()
  regionId: number;

  @Column()
  locusId: number;

  @Column()
  membershipStatus: string;

  @ManyToOne(() => LocusEntity, (locus) => locus.locusMembers)
  locus: LocusEntity;
}
