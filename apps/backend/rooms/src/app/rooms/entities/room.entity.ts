import { IRoom, RoomType } from '@core';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms', {
  name: 'rooms',
  comment: 'Rooms table',
  orderBy: {
    createdAt: 'DESC',
  },
})
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

  @Column('simple-array')
  participantIds: string[];

  @Column('simple-array')
  ownerIds: string[];

  @Column('simple-array')
  moderatorIds: string[];

  @Column('simple-array')
  collaboratorIds: string[];

  constructor() {
    this.participantIds = [];
    this.ownerIds = [];
    this.moderatorIds = [];
    this.collaboratorIds = [];
  }

  @BeforeInsert()
  beforeInsertActions() {
    this.participantIds.push(this.authorId);
    this.ownerIds.push(this.authorId);
    this.moderatorIds.push(this.authorId);
    this.collaboratorIds.push(this.authorId);
  }
}
