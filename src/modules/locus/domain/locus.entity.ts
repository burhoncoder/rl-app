import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { LocusMemberEntity } from '../../locus-member/domain/locus-member.entity';

@Entity('rnc_locus')
export class LocusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assemblyId: string;

  @Column()
  locusName: string;

  @Column()
  publicLocusName: string;

  @Column()
  chromosome: string;

  @Column()
  strand: string;

  @Column()
  locusStart: number;

  @Column()
  locusStop: number;

  @Column()
  memberCount: number;

  @OneToMany(() => LocusMemberEntity, (locusEntity) => locusEntity.locus, {
    eager: false,
  })
  locusMembers: LocusMemberEntity[];
}
