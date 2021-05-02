import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Attend extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  attendeeId: number;

  @Column()
  attending: boolean;

  @ManyToOne(() => Event, (event) => event.attendees, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  event: Event;

  // version column
  // helps in optimistic concurency control
  @VersionColumn()
  version: number;
}
