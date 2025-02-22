import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { LocusEntity } from '../domain/locus.entity';

@Injectable()
export class LocusRepository extends Repository<LocusEntity> {}
