import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Attend } from './attend.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'real' })
  latitude: number;

  @Column({ type: 'real' })
  longitude: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  // service job just to send query results
  // keep as less burder as possible and only fields enough for fast loading
  @Column()
  organizerEmail: string;

  @Column()
  image: string;

  @OneToMany(() => Attend, (attendee) => attendee.event)
  attendees: Attend[];
}
