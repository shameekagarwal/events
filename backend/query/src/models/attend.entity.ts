import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Attend extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  attending: boolean;

  @Column()
  attendeeEmail: string;

  @Column()
  version: number;

  @ManyToOne(() => Event, (event) => event.attendees, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  event: Event;
}
