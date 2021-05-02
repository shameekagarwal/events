import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Attend } from './attend.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Attend, (attendee) => attendee.event)
  attendees: Attend[];
}
