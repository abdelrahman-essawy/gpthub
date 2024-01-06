import { IResource, ResourceFormat, ResourceType } from '@core';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ResourceEntity implements IResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ enum: ResourceType, type: 'enum' })
  type: ResourceType;

  @Column({ enum: ResourceFormat, type: 'enum' })
  format: ResourceFormat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @PrimaryColumn()
  authorId: string;
}
