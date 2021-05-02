import { EntityRepository, Repository } from 'typeorm';
import { Attend } from './attend.entity';

@EntityRepository(Attend)
export class AttendRepository extends Repository<Attend> {}
