import { IRoom, RoomType } from '@core';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RoomEntity implements IRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: RoomType,
    default: RoomType.PUBLIC,
  })
  roomType: RoomType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @PrimaryColumn()
  authorId: string;

  @Column('simple-array')
  resourceIds: string[];

  @Column('simple-array', { nullable: true, default: [] })
  participantIds: string[];

  @Column('simple-array')
  ownerIds: string[];

  @Column('simple-array', { nullable: true, default: [] })
  moderatorIds: string[];

  @Column('simple-array', { nullable: true, default: [] })
  collaboratorIds: string[];
}
