import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser, UserRole } from '@core';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { IDatabaseEntity } from '../../../../../../../libs/core/src/interfaces/interface';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User implements IUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @Directive('@external')
  id: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  birthday?: Date;

  @Field(() => String)
  @Column({ enum: UserRole, default: UserRole.USER, type: 'enum' })
  role?: UserRole;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(user: Omit<IUser, keyof IDatabaseEntity>) {
    Object.assign(this, user);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
