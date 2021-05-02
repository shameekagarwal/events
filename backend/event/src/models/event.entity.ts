import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, type: 'real' })
  latitude: number;

  @Column({ nullable: false, type: 'real' })
  longitude: number;

  @Column({ type: 'timestamptz', nullable: false })
  date: Date;

  @Column({ nullable: false })
  organizerId: number;

  @Column({ nullable: false })
  image: string;
}
