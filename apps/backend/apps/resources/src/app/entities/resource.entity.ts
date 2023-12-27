import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IResource, ResourceFormat, ResourceType } from '@core';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDatabaseEntity } from '../../../../../../../libs/core/src/interfaces/interface';
import { User } from './user.local.entity';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Resource implements IResource {
  @Field(() => ID)
  @ObjectIdColumn()
  @Directive('@external')
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ nullable: true })
  @Field(() => String)
  description?: string;

  @Column({ enum: ResourceType, type: 'enum' })
  @Field(() => String)
  type: ResourceType;

  @Column({ enum: ResourceFormat, type: 'enum' })
  @Field(() => String)
  format: ResourceFormat;

  @Column()
  @Field(() => ID)
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  author: User;

  constructor(resource: Omit<IResource, keyof IDatabaseEntity>) {
    Object.assign(this, resource);
  }
}
